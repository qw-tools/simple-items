import * as PIXI from "pixi.js";
import { saveAs } from "file-saver";
import { nullOperation } from "@/pkg/functions";
import { publicUrl } from "@/pkg/viteUtil";
import { ItemTile } from "@/features/SimpleItemsEditor/pixi/ItemTile";
import { Point2D } from "@/pkg/geometry";
import { Item } from "@/features/SimpleItemsEditor/types";
import * as EE from "../events";
import { createSelectionChange } from "../events";

import { GRID_SIZE } from "@/features/SimpleItemsEditor/config";

export interface SimpleItemsAppSettings {
  containerId: string;
  items: Item[];
  onReady: () => void;
  onChange: () => void;
}

export class SimpleItemsApp extends PIXI.Application {
  private readonly _containerDiv: HTMLElement;
  private _tiles: PIXI.Container = new PIXI.Container();
  private _gridLines: PIXI.Graphics = new PIXI.Graphics();
  private _highlight: PIXI.Graphics = new PIXI.Graphics();
  private _gridSizeCache: Point2D = { x: 1, y: 1 };
  onReady: () => void = nullOperation;
  onChange: () => void = nullOperation;

  constructor(settings: SimpleItemsAppSettings) {
    const { containerId } = settings;
    const containerDiv = document.getElementById(containerId) as HTMLElement;

    super({ backgroundAlpha: 0 });

    this._highlight.visible = false;
    this._highlight.beginFill("#00ff00", 0.2);
    this._highlight.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    this._highlight.endFill();

    this.stage.addChild(this._highlight);
    this.stage.addChild(this._tiles);
    this.stage.addChild(this._gridLines);

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
          (primaryTexture: PIXI.Texture, itemIndex) => {
            const container = new ItemTile(settings.items[itemIndex]);

            this._tiles.addChild(container);
          }
        );

        this._resize();
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

    this._containerDiv.addEventListener("dragenter", () => {
      console.log("dragenter");
      this._highlight.visible = true;
    });
    this._containerDiv.addEventListener("dragleave", () => {
      console.log("dragenter");
      this._highlight.visible = false;
    });

    this._onClick = this._onClick.bind(this);
    this._containerDiv.addEventListener("click", this._onClick);

    this._onDragOver = this._onDragOver.bind(this);
    this._containerDiv.addEventListener("dragover", this._onDragOver);

    this._onFileDrop = this._onFileDrop.bind(this);
    this._containerDiv.addEventListener("drop", this._onFileDrop);

    this._onSettingsChange = this._onSettingsChange.bind(this);
    document.addEventListener(EE.Name.SETTINGS_CHANGE, this._onSettingsChange);

    this._onSettingsReset = this._onSettingsReset.bind(this);
    document.addEventListener(EE.Name.SETTINGS_RESET, this._onSettingsReset);

    this._onSelectAll = this._onSelectAll.bind(this);
    document.addEventListener(EE.Name.SELECT_ALL, this._onSelectAll);

    this._onSelectNone = this._onSelectNone.bind(this);
    document.addEventListener(EE.Name.SELECT_NONE, this._onSelectNone);

    this._onSelectInvert = this._onSelectInvert.bind(this);
    document.addEventListener(EE.Name.SELECT_INVERT, this._onSelectInvert);
  }

  private _onSelectAll(): void {
    this._tiles.children.forEach((tile: ItemTile) => {
      tile.select();
    });

    this._announceSelectionChange();
  }

  private _onSelectNone(): void {
    this._getSelectedTiles().forEach((tile: ItemTile) => {
      tile.deselect();
    });

    this._announceSelectionChange();
  }

  private _onSelectInvert(): void {
    this._tiles.children.forEach((tile: ItemTile) => {
      tile.toggleSelect();
    });

    this._announceSelectionChange();
  }

  private _onClick(): void {
    this._announceSelectionChange();
  }

  private _announceSelectionChange(): void {
    document.dispatchEvent(createSelectionChange(this._getSelectedItems()));
  }

  private _onSettingsReset(): void {
    this._getSelectedTiles().forEach((item: ItemTile) => {
      item.resetSettings();
    });
  }

  private _onSettingsChange(e: Event): void {
    const { property, value } = (e as CustomEvent).detail;

    const getAction = () => {
      switch (property) {
        case EE.Prop.COLOR:
          return (item: ItemTile) => (item.color = value);
        case EE.Prop.PRIMARY_SCALE:
          return (item: ItemTile) => (item.primaryScale = parseFloat(value));
        case EE.Prop.OUTLINE_ENABLED:
          return (item: ItemTile) => (item.outlineEnabled = value);
        case EE.Prop.OUTLINE_COLOR:
          return (item: ItemTile) => (item.outlineColor = value);
        case EE.Prop.OUTLINE_WIDTH:
          return (item: ItemTile) => (item.outlineWidth = value);
        default:
          return nullOperation;
      }
    };

    const action = getAction();

    this._getSelectedTiles().map(action);
  }

  private _resize(): void {
    const { x, y } = this._calcGridSize();
    this._gridSizeCache = { x, y };
    this.renderer.resize(x * GRID_SIZE, y * GRID_SIZE);
    this._alignItems();
  }

  private _calcGridSize(): Point2D {
    const container = document.getElementById("AppContainerWidth");
    const sidebar = document.getElementById("AppSettings");

    if (!container || !sidebar) {
      return { x: 1, y: 1 };
    }

    const sidebarGapWidth = 16;
    const availableWidth =
      container.clientWidth - sidebar.clientWidth - sidebarGapWidth;
    const availableColumnCount = Math.floor(availableWidth / GRID_SIZE);
    const minColumnCount = 3;
    const columnCount = Math.max(minColumnCount, availableColumnCount);
    const rowCount = Math.ceil(this._tiles.children.length / columnCount);

    return {
      x: columnCount,
      y: rowCount,
    };
  }

  private _alignItems(): void {
    const items = this._tiles.children;
    const itemsPerRow = Math.floor(this.screen.width / GRID_SIZE);

    for (let i = 0; i < items.length; i++) {
      items[i].x = (i % itemsPerRow) * GRID_SIZE;
      items[i].y = Math.floor(i / itemsPerRow) * GRID_SIZE;
    }

    this._drawGrid();
  }

  private _drawGrid(): void {
    this._gridLines.clear();
    this._gridLines.lineStyle(1, "black", 0.1);

    let x = GRID_SIZE;

    while (x < this.screen.width) {
      this._gridLines.moveTo(x, 0);
      this._gridLines.lineTo(x, 1600);
      x += GRID_SIZE;
    }

    let y = GRID_SIZE;

    while (y < 1600) {
      this._gridLines.moveTo(0, y);
      this._gridLines.lineTo(this.screen.width, y);
      y += GRID_SIZE;
    }
  }

  private _onDragOver(event: DragEvent): void {
    const itemIndex = this._eventToItemIndex(event);

    if (itemIndex === -1) {
      this._highlight.visible = false;
      return;
    }

    const item = this._tiles.getChildAt(itemIndex);
    this._highlight.x = item.x;
    this._highlight.y = item.y;
    this._highlight.visible = true;
  }

  private _eventToItemIndex(event: MouseEvent): number {
    const containerBounds = this._containerDiv.getBoundingClientRect();
    const x = event.clientX - containerBounds.left;
    const y = event.clientY - containerBounds.top;

    const colIndex = Math.floor(x / GRID_SIZE);
    const rowIndex = Math.floor(y / GRID_SIZE);

    const tileIndex = colIndex + rowIndex * this._gridSizeCache.x;
    const maxTileIndex = this._tiles.children.length - 1;

    if (tileIndex > maxTileIndex) {
      return -1;
    }

    return tileIndex;
  }

  private _onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this._highlight.visible = false;

    if (!event.dataTransfer) {
      return;
    }

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((f) => f.type.startsWith("image"));

    if (0 === imageFiles.length) {
      return;
    }

    const itemIndex = this._eventToItemIndex(event);

    console.log("FIILZE", itemIndex);

    try {
      //const url = URL.createObjectURL(imageFiles[0]);
      //this.loadTexture(url);
    } catch (e) {
      // do nothing
    }
  }

  private _unlisten(): void {
    // document.removeEventListener(
    //   EditorEvent.SHARED_SETTINGS_CHANGE,
    //   this._onSharedSettingsChange
    // );
  }

  private _onChange(): void {
    this.render();
    this.onChange();
  }

  private _getSelectedTiles(): ItemTile[] {
    return this._tiles.children
      .filter((item: ItemTile) => item.isSelected)
      .map((i) => i as ItemTile);
  }

  private _getSelectedItems(): Item[] {
    return this._getSelectedTiles().map((i) => i.item);
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
