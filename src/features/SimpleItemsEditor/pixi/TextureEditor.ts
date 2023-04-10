import * as PIXI from "pixi.js";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import { saveAs } from "file-saver";
import { nullOperation } from "@/pkg/functions";
import { EditorEvent, FiltersChange } from "./events";
import { FilterInputs } from "./filter";
import { calculateAspectRatioFit, calculateCenterOffset } from "@/pkg/geometry";

const EDITOR_SIZE = 160;

export interface TextureEditorSettings {
  containerId: string;
  texturePath: string;
  backgroundColor: string;
  onReady: () => void;
  onChange: () => void;
}

export class TextureEditor extends PIXI.Application {
  private readonly _containerDiv: HTMLElement;
  private readonly _settings: TextureEditorSettings;
  private readonly _colorOverlayFilter: ColorOverlayFilter =
    new ColorOverlayFilter();
  private readonly _outlineFilter: OutlineFilter = new OutlineFilter(
    2,
    0x000000,
    1
  );
  private _textureSprite: PIXI.Sprite = new PIXI.Sprite();
  private _textureContainer: PIXI.Container = new PIXI.Container();
  private _textureScale = 0.8;
  onReady: () => void = nullOperation;
  onChange: () => void = nullOperation;

  constructor(settings: TextureEditorSettings) {
    const { containerId, backgroundColor } = settings;
    super({ width: EDITOR_SIZE, height: EDITOR_SIZE, backgroundAlpha: 0 });
    this._settings = settings;

    // filters
    this.backgroundColor = backgroundColor;

    this._textureContainer.filters = [
      this._colorOverlayFilter,
      this._outlineFilter,
    ];
    this.stage.addChild(this._textureContainer);

    // HTML elements
    this._containerDiv = document.getElementById(containerId) as HTMLElement;

    const canvas = this.getCanvas();
    canvas.id = `${containerId}-canvas`;
    canvas.classList.add(..."editor-canvas app-dropzone".split(" "));

    // events
    this._listen();

    // callbacks
    this.onChange = settings.onChange;
    this.onReady = settings.onReady;

    // load texture
    this.loadTexture(settings.texturePath).then(() => {
      this.onReady();
    });
  }

  destroy(): void {
    this._unlisten();
    super.destroy();
  }

  private _listen(): void {
    const canvas = this.getCanvas();
    const container = this._containerDiv;

    canvas.addEventListener("dragenter", () => {
      container.classList.add("editor-drag");
    });
    canvas.addEventListener("dragleave", () => {
      container.classList.remove("editor-drag");
    });
    this._onFileDrop = this._onFileDrop.bind(this);
    canvas.addEventListener("drop", this._onFileDrop);

    this._onFiltersChange = this._onFiltersChange.bind(this);
    document.addEventListener(
      EditorEvent.FILTERS_CHANGE,
      this._onFiltersChange
    );
  }

  private _onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this._containerDiv.classList.remove("editor-drag");

    if (!event.dataTransfer) {
      return;
    }

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((f) => f.type.startsWith("image"));

    if (0 === imageFiles.length) {
      return;
    }

    try {
      const url = URL.createObjectURL(imageFiles[0]);
      this.loadTexture(url);
    } catch (e) {
      // do nothing
    }
  }

  private _unlisten(): void {
    document.removeEventListener(
      EditorEvent.FILTERS_CHANGE,
      this._onFiltersChange
    );
  }

  private _onChange(): void {
    this.render();
    this.onChange();
  }

  private _onFiltersChange(e: Event): void {
    this.filters = (e as FiltersChange).filters;
  }

  set filters(filters: FilterInputs) {
    this._outlineFilter.enabled = filters.outline.enabled;

    if (filters.outline.enabled) {
      this._outlineFilter.color = new PIXI.Color(
        filters.outline.color
      ).toNumber();
      this._outlineFilter.thickness = filters.outline.size;
    }

    this.textureScale = filters.scale.value;

    this._onChange();
  }

  set backgroundColor(value: string) {
    this._colorOverlayFilter.color = new PIXI.Color(value).toNumber();
  }

  set textureScale(value: number) {
    this._textureScale = value;
    this._scaleTextureToFit();
  }

  private _centerTexture(): void {
    const centerOffset = calculateCenterOffset(
      this._textureSprite.width,
      this._textureSprite.height,
      EDITOR_SIZE,
      EDITOR_SIZE
    );

    this._textureSprite.position.set(centerOffset.x, centerOffset.y);
  }

  private _scaleTextureToFit(): void {
    const fittedSize = calculateAspectRatioFit(
      this._textureSprite.texture.orig.width,
      this._textureSprite.texture.orig.height,
      EDITOR_SIZE * this._textureScale,
      EDITOR_SIZE * this._textureScale
    );

    this._textureSprite.width = fittedSize.width;
    this._textureSprite.height = fittedSize.height;
    this._centerTexture();
  }

  set texture(texture: PIXI.Texture) {
    this._textureSprite?.destroy();
    this._textureSprite = PIXI.Sprite.from(texture);
    this._scaleTextureToFit();
    this._textureContainer.addChild(this._textureSprite);

    this._onChange();
  }

  async loadTexture(url: string): Promise<void> {
    this.texture = await PIXI.Texture.fromURL(url);
  }

  download(filename = ""): void {
    this.render();
    saveAs(this.toDataUrl(), filename || "download");
  }

  toDataUrl(): string {
    return this.getCanvas().toDataURL();
  }

  getCanvas(): HTMLCanvasElement {
    return this.view as HTMLCanvasElement;
  }
}
