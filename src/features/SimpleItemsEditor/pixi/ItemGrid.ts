import * as PIXI from "pixi.js";
import { saveAs } from "file-saver";
import { nullOperation } from "@/pkg/functions";
import { ItemTile } from "@/features/SimpleItemsEditor/pixi/ItemTile";
import { Point2D } from "@/pkg/geometry";
import { Item } from "@/features/SimpleItemsEditor/types";
import * as EE from "../events";
import { dispatch, Name } from "../events";
import {
  BlobReader,
  BlobWriter,
  EntryMetaData,
  ZipWriter,
} from "@zip.js/zip.js";

import { GRID_DIM, GRID_SIZE } from "@/features/SimpleItemsEditor/config";
import { canvasToBlob } from "@/pkg/canvas";
import { deepCopy } from "@/pkg/dataUtil";

export interface SimpleItemsAppSettings {
  containerId: string;
  items: Item[];
  onReady?: () => void;
  onChange?: () => void;
}

export class ItemGrid extends PIXI.Application {
  private readonly _containerDiv: HTMLElement;
  private readonly _tiles: PIXI.Container = new PIXI.Container();
  private _gridLines: PIXI.Graphics = new PIXI.Graphics();
  private _highlight: PIXI.Graphics = new PIXI.Graphics();
  private _gridSizeCache: Point2D = { x: 1, y: 1 };
  onReady: () => void = nullOperation;
  onChange: () => void = nullOperation;

  constructor(settings: SimpleItemsAppSettings) {
    const { containerId } = settings;
    super({ antialias: true, backgroundAlpha: 0 });

    this._highlight.visible = false;
    this._highlight.beginFill("#00ff00", 0.2);
    this._highlight.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    this._highlight.endFill();

    this.stage.addChild(this._highlight);
    this.stage.addChild(this._tiles);
    this.stage.addChild(this._gridLines);

    // HTML elements
    const canvas = this._getCanvas();
    canvas.id = `${containerId}-canvas`;
    canvas.classList.add("editor-canvas");
    this._containerDiv = document.getElementById(containerId) as HTMLElement;
    this._containerDiv.append(canvas);

    // events
    this._listen();

    // callbacks
    if (settings.onChange) {
      this.onChange = settings.onChange;
    }

    if (settings.onReady) {
      this.onReady = settings.onReady;
    }

    // load textures
    const textureUrls = settings.items.map(
      (item: Item) => item.defaultSettings.texturePath
    );

    PIXI.Assets.load(textureUrls)
      .then(() => {
        settings.items.forEach((item: Item) => {
          const container = new ItemTile(item);
          this._tiles.addChild(container);
        });

        this._resize();
        this.onReady();
      })
      .catch((e) => {
        console.log("FAIL LOAD", e);
      });
  }

  private _listen(): void {
    window.addEventListener("resize", () => {
      this._resize();
    });

    this._containerDiv.addEventListener("dragenter", () => {
      this._highlight.visible = true;
    });
    this._containerDiv.addEventListener("dragleave", () => {
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

    this._onDownload = this._onDownload.bind(this);
    document.addEventListener(EE.Name.DOWNLOAD, this._onDownload);
  }

  private async _downloadTiles(tiles: ItemTile[]): Promise<void> {
    const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
    const zipOperations: Promise<EntryMetaData>[] = [];

    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const tileBlob = await this._getTileBlob(tile);

      if (tileBlob != null) {
        const { filename, textureDirPath } = tile.item;
        const filePath = `${textureDirPath}/${filename}`;
        zipOperations.push(zipWriter.add(filePath, new BlobReader(tileBlob)));
      }
    }

    if (0 === zipOperations.length) {
      return;
    }

    await Promise.all(zipOperations);
    const zipBlob = await zipWriter.close();
    saveAs(zipBlob, "simpleitems.zip");
  }

  private async _downloadTile(tile: ItemTile): Promise<void> {
    const tileBlob = await this._getTileBlob(tile);

    if (tileBlob) {
      saveAs(tileBlob, tile.item.filename);
    }
  }

  private _getTileCanvas(tile: ItemTile): HTMLCanvasElement {
    const renderTexture = PIXI.RenderTexture.create(GRID_DIM);
    this.renderer.render(tile.shapeLayer, { renderTexture });
    return this.renderer.extract.canvas(renderTexture) as HTMLCanvasElement;
  }

  private _getCanvas(): HTMLCanvasElement {
    return this.view as HTMLCanvasElement;
  }

  private async _getTileBlob(tile: ItemTile): Promise<Blob | null> {
    return canvasToBlob(this._getTileCanvas(tile));
  }

  private _getTileByIndex(index: number): ItemTile {
    return this._getTiles()[index];
  }

  private _getTiles(): ItemTile[] {
    return this._tiles.children as ItemTile[];
  }

  private _getSelectedTiles(): ItemTile[] {
    return this._getTiles().filter((tile: ItemTile) => tile.isSelected());
  }

  private _getSelectedItems(): Item[] {
    return this._getSelectedTiles().map((i: ItemTile) => i.item);
  }

  private _onClick(): void {
    this._onSelectionChange();
  }

  private async _onDownload(): Promise<void> {
    let selectedTiles = this._getSelectedTiles();

    if (1 === selectedTiles.length) {
      return await this._downloadTile(selectedTiles[0]);
    }

    if (selectedTiles.length === 0) {
      selectedTiles = this._getTiles();
    }

    await this._downloadTiles(selectedTiles);
  }

  private _onDragOver(event: DragEvent): void {
    const itemIndex = this._eventToTileIndex(event);

    if (itemIndex === -1) {
      this._highlight.visible = false;
      return;
    }

    const item = this._tiles.getChildAt(itemIndex);
    this._highlight.x = item.x;
    this._highlight.y = item.y;
    this._highlight.visible = true;
  }

  private _onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this._highlight.visible = false;

    if (!event.dataTransfer) {
      return;
    }

    const files: File[] = Array.from(event.dataTransfer.files);
    const imageFiles: File[] = files.filter((f) => f.type.startsWith("image"));

    if (0 === imageFiles.length) {
      return;
    }

    const tileIndex = this._eventToTileIndex(event);

    if (tileIndex < 0) {
      return;
    }

    try {
      const tile: ItemTile = this._getTileByIndex(tileIndex);
      tile.primaryTexture = URL.createObjectURL(imageFiles[0]);
      tile.select();
      this._onSelectionChange();
    } catch (e) {
      // do nothing
    }
  }

  private _onSelectionChange(): void {
    const items = deepCopy(this._getSelectedItems());
    dispatch(Name.SELECT_CHANGE, { items });
  }

  private _onSelectAll(): void {
    this._getTiles().forEach((tile: ItemTile) => {
      tile.select();
    });

    this._onSelectionChange();
  }

  private _onSelectNone(): void {
    this._getSelectedTiles().forEach((tile: ItemTile) => {
      tile.deselect();
    });

    this._onSelectionChange();
  }

  private _onSelectInvert(): void {
    this._getTiles().forEach((tile: ItemTile) => {
      tile.toggleSelect();
    });

    this._onSelectionChange();
  }

  private _onSettingsChange(e: Event): void {
    const { property, value } = (e as CustomEvent).detail;

    const getAction = () => {
      switch (property) {
        case EE.Prop.COLOR:
          return (item: ItemTile) => (item.color = value);
        case EE.Prop.PRIMARY_ROTATION:
          return (item: ItemTile) => (item.primaryRotation = parseInt(value));
        case EE.Prop.PRIMARY_SCALE:
          return (item: ItemTile) => (item.primaryScale = parseFloat(value));

        case EE.Prop.SECONDARY_ENABLED:
          return (item: ItemTile) => (item.secondaryEnabled = value);
        case EE.Prop.SECONDARY_SHAPE:
          return (item: ItemTile) => (item.secondaryShape = value);
        case EE.Prop.SECONDARY_ROTATION:
          return (item: ItemTile) => (item.secondaryRotation = parseInt(value));
        case EE.Prop.SECONDARY_SCALE:
          return (item: ItemTile) => (item.secondaryScale = parseFloat(value));
        case EE.Prop.SECONDARY_OUTER_SCALE:
          return (item: ItemTile) =>
            (item.secondaryOuterScale = parseFloat(value));
        case EE.Prop.SECONDARY_INNER_SCALE:
          return (item: ItemTile) =>
            (item.secondaryInnerScale = parseFloat(value));

        case EE.Prop.OUTLINE_ENABLED:
          return (item: ItemTile) => (item.outlineEnabled = value);
        case EE.Prop.OUTLINE_COLOR:
          return (item: ItemTile) => (item.outlineColor = value);
        case EE.Prop.OUTLINE_WIDTH:
          return (item: ItemTile) => (item.outlineWidth = parseInt(value));
        default:
          return nullOperation;
      }
    };

    const action = getAction();

    this._getSelectedTiles().map(action);
  }

  private _onSettingsReset(): void {
    this._getSelectedTiles().forEach((item: ItemTile) => {
      item.resetSettings();
    });
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

  private _resize(): void {
    const { x, y } = this._calcGridSize();
    this._gridSizeCache = { x, y };
    this.renderer.resize(x * GRID_SIZE, y * GRID_SIZE);
    this._alignItems();
  }

  private _eventToTileIndex(event: MouseEvent): number {
    const containerBounds = this._containerDiv.getBoundingClientRect();
    const x = event.clientX - containerBounds.left;
    const y = event.clientY - containerBounds.top;
    return this._pointToTileIndex({ x, y });
  }

  private _pointToTileIndex(point: Point2D): number {
    const { x, y } = point;
    const colIndex = Math.floor(x / GRID_SIZE);
    const rowIndex = Math.floor(y / GRID_SIZE);
    const tileIndex = colIndex + rowIndex * this._gridSizeCache.x;
    const maxTileIndex = this._tiles.children.length - 1;

    if (tileIndex > maxTileIndex) {
      return -1;
    }

    return tileIndex;
  }
}
