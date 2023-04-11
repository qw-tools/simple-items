import * as PIXI from "pixi.js";
import { saveAs } from "file-saver";
import { nullOperation } from "@/pkg/functions";
import { EditorEvent, SharedSettingsChange } from "./events";
import { getDefaultSharedSettings, SharedSettings } from "./SharedSettings";
import type { Item } from "@/pkg/quake/items";
import { publicUrl } from "@/pkg/viteUtil";
import { ItemContainer } from "@/features/SimpleItemsEditor/pixi/ItemContainer";

const GRID_SIZE = 120;

export interface SimpleItemsAppSettings {
  containerId: string;
  items: Item[];
  onReady: () => void;
  onChange: () => void;
}

export class SimpleItemsApp extends PIXI.Application {
  private readonly _containerDiv: HTMLElement;
  private _itemLayer: PIXI.Container = new PIXI.Container();
  private _grid: PIXI.Graphics = new PIXI.Graphics();
  private _sharedSettings: SharedSettings = getDefaultSharedSettings();
  onReady: () => void = nullOperation;
  onChange: () => void = nullOperation;

  constructor(settings: SimpleItemsAppSettings) {
    const { containerId } = settings;
    const containerDiv = document.getElementById(containerId) as HTMLElement;

    super({ backgroundAlpha: 0 });

    this.stage.addChild(this._itemLayer);
    this.stage.addChild(this._grid);

    // HTML elements
    this._containerDiv = containerDiv;
    const canvas = this.getCanvas();
    canvas.id = `${containerId}-canvas`;
    canvas.classList.add("editor-canvas");

    // events
    this._listen();

    // callbacks
    this.onChange = settings.onChange;
    this.onReady = settings.onReady;

    // load textures
    const textureUrls = settings.items.map((item: Item) =>
      publicUrl(`assets/textures/${item.filename}`)
    );

    PIXI.Assets.load(textureUrls)
      .then((result) => {
        Object.values(result).forEach(
          (innerTexture: PIXI.Texture, itemIndex) => {
            const container = new ItemContainer({
              size: GRID_SIZE,
              scale: this._sharedSettings.scale.value,
              backgroundColor: settings.items[itemIndex].backgroundColor,
              innerTexture: innerTexture,
              outerShapeType: "circle",
            });

            this._itemLayer.addChild(container);
          }
        );

        this._resize();
        this._alignItems();
        this.onReady();
      })
      .catch(nullOperation);
  }

  destroy(): void {
    this._unlisten();
    super.destroy();
  }

  private _listen(): void {
    window.addEventListener("resize", () => {
      this._resize();
    });

    this._onSharedSettingsChange = this._onSharedSettingsChange.bind(this);
    document.addEventListener(
      EditorEvent.SHARED_SETTINGS_CHANGE,
      this._onSharedSettingsChange
    );
  }

  private _resize(): void {
    const container = document.getElementById("AppContainerWidth");
    const sidebar = document.getElementById("AppSettings");

    if (!container || !sidebar) {
      return;
    }

    const sidebarGapWidth = 16;
    const availableWidth =
      container.clientWidth - sidebar.clientWidth - sidebarGapWidth;
    const availableColumnCount = Math.floor(availableWidth / GRID_SIZE);
    const minColumnCount = 3;
    const columnCount = Math.max(minColumnCount, availableColumnCount);
    const rowCount = Math.ceil(this._itemLayer.children.length / columnCount);
    this.renderer.resize(columnCount * GRID_SIZE, rowCount * GRID_SIZE);

    this._alignItems();
  }

  _alignItems(): void {
    const items = this._itemLayer.children;
    const itemsPerRow = Math.floor(this.screen.width / GRID_SIZE);

    for (let i = 0; i < items.length; i++) {
      items[i].x = (i % itemsPerRow) * GRID_SIZE;
      items[i].y = Math.floor(i / itemsPerRow) * GRID_SIZE;
    }

    this._drawGrid();
  }

  private _drawGrid(): void {
    this._grid.clear();
    this._grid.lineStyle(1, "black", 0.1);

    let x = GRID_SIZE;

    while (x < this.screen.width) {
      this._grid.moveTo(x, 0);
      this._grid.lineTo(x, 1600);
      x += GRID_SIZE;
    }

    let y = GRID_SIZE;

    while (y < 1600) {
      this._grid.moveTo(0, y);
      this._grid.lineTo(this.screen.width, y);
      y += GRID_SIZE;
    }
  }

  // private _onFileDrop(event: DragEvent): void {
  //   event.preventDefault();
  //   this._containerDiv.classList.remove("editor-drag");
  //
  //   if (!event.dataTransfer) {
  //     return;
  //   }
  //
  //   const files = Array.from(event.dataTransfer.files);
  //   const imageFiles = files.filter((f) => f.type.startsWith("image"));
  //
  //   if (0 === imageFiles.length) {
  //     return;
  //   }
  //
  //   try {
  //     const url = URL.createObjectURL(imageFiles[0]);
  //     //this.loadTexture(url);
  //   } catch (e) {
  //     // do nothing
  //   }
  // }

  private _unlisten(): void {
    document.removeEventListener(
      EditorEvent.SHARED_SETTINGS_CHANGE,
      this._onSharedSettingsChange
    );
  }

  private _onChange(): void {
    this.render();
    this.onChange();
  }

  private _onSharedSettingsChange(e: Event): void {
    this.settings = (e as SharedSettingsChange).settings;
  }

  set settings(settings: SharedSettings) {
    this._itemLayer.children.forEach((item: ItemContainer) => {
      item.itemScale = settings.scale.value;
      item.itemOutline.enabled = settings.outline.enabled;

      if (settings.outline.enabled) {
        item.itemOutline.color = new PIXI.Color(
          settings.outline.color
        ).toNumber();
        item.itemOutline.thickness = settings.outline.size;
      }
    });

    this._onChange();
  }

  download(filename = ""): void {
    // todo: download as zip
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
