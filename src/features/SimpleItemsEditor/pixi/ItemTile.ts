import * as PIXI from "pixi.js";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import { calculateAspectRatioFit, calculateCenterOffset } from "@/pkg/geometry";
import { Checkbox } from "@/features/SimpleItemsEditor/pixi/Checkbox";
import { GRID_SIZE } from "@/features/SimpleItemsEditor/config";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";

export class ItemTile extends PIXI.Container {
  private readonly _item: Item;
  private readonly _itemSettings: ItemSettings;
  private readonly _colorOverlay: ColorOverlayFilter = new ColorOverlayFilter();
  private readonly _outline: OutlineFilter = new OutlineFilter(2, 0x000000, 1);
  private readonly _checkbox: Checkbox = new Checkbox();
  private _primaryShape: PIXI.Sprite = new PIXI.Sprite();
  private _secondaryShape: PIXI.Graphics = new PIXI.Graphics();
  private _shapeLayer: PIXI.Container = new PIXI.Container();
  private _background: PIXI.Graphics = new PIXI.Graphics();

  constructor(item: Item) {
    super();

    this.hitArea = new PIXI.Rectangle(0, 0, GRID_SIZE, GRID_SIZE);

    // background
    this._background.beginFill(0x3366ff, 0.12);
    this._background.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    this._background.endFill();
    this._background.visible = false;
    this.addChild(this._background);

    // todo: secondary
    // const outerScale = 0.6;
    // const outerSize = outerScale * GRID_SIZE;
    // this._secondaryShape.beginFill("red", 1);
    // this._secondaryShape.drawRect(0, 0, outerSize, outerSize);
    // this._secondaryShape.endFill();
    //
    // const innerScale = 0.8;
    //
    // if (innerScale > 0) {
    //   const innerSize = innerScale * outerSize;
    //   const innerOffset = outerSize / 2 - innerSize / 2;
    //
    //   this._secondaryShape.beginHole();
    //   this._secondaryShape.drawRect(
    //     innerOffset,
    //     innerOffset,
    //     innerSize,
    //     innerSize
    //   );
    //   this._secondaryShape.endHole();
    // }

    this._shapeLayer.addChild(this._secondaryShape, this._primaryShape);
    this._shapeLayer.addChild(this._secondaryShape);
    this._shapeLayer.filters = [this._colorOverlay, this._outline];
    this.addChild(this._shapeLayer);

    // item
    this._item = item;
    this._itemSettings = Object.assign({}, item.defaultSettings);
    this.applySettings(this._itemSettings);

    // checkbox
    this._checkbox.visible = false;
    this._checkbox.position.set(GRID_SIZE - 28, GRID_SIZE - 28);
    this.addChild(this._checkbox);

    // events
    this._listen();
  }

  get item(): Item {
    return this._item;
  }

  set outlineEnabled(value: boolean) {
    this._outline.enabled = value;
  }

  set outlineColor(value: string) {
    this._outline.color = new PIXI.Color(value).toNumber();
  }

  set outlineWidth(value: number) {
    this._outline.thickness = value;
  }

  set color(value: string) {
    this._itemSettings.color = value;
    this._colorOverlay.color = new PIXI.Color(value).toNumber();
  }

  set primaryScale(value: number) {
    this._itemSettings.scale = value;
    this._scaleShapesToFit();
  }

  set primaryTexture(source: PIXI.SpriteSource) {
    this._itemSettings.texturePath = source.toString();
    this._primaryShape?.destroy();
    this._primaryShape = PIXI.Sprite.from(source);
    this._scaleShapesToFit();
    this._shapeLayer.addChild(this._primaryShape);
  }

  public toggleSelect(): void {
    this._checkbox.toggle();

    if (this._checkbox.isSelected()) {
      this._focus();
    } else {
      this._unfocus();
    }
  }

  public select(): void {
    this._checkbox.select();
    this._focus();
  }

  public deselect(): void {
    this._checkbox.deselect();
    this._unfocus();
  }

  private _focus(): void {
    this._background.visible = true;
    this._checkbox.visible = true;
  }

  private _unfocus(): void {
    this._background.visible = false;
    this._checkbox.visible = false;
  }

  get isSelected(): boolean {
    return this._checkbox.isSelected();
  }

  public applySettings(settings: ItemSettings): void {
    this.color = settings.color;

    this.primaryScale = settings.scale;
    this.primaryTexture = settings.texturePath;

    this.outlineEnabled = settings.outline.enabled;
    this.outlineColor = settings.outline.color;
    this.outlineWidth = settings.outline.width;
  }

  public resetSettings(): void {
    this.applySettings(this._item.defaultSettings);
  }

  private _listen(): void {
    this.eventMode = "static";

    const stopEvent = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    this.addEventListener("click", () => {
      this.toggleSelect();
    });

    this.addEventListener("mouseover", (e: MouseEvent) => {
      stopEvent(e);

      this._focus();
    });
    this.addEventListener("mouseleave", (e: MouseEvent) => {
      stopEvent(e);

      if (!this.isSelected) {
        this._unfocus();
      }
    });
  }

  private _centerShapes(): void {
    const primaryOffset = calculateCenterOffset(
      this._primaryShape.width,
      this._primaryShape.height,
      GRID_SIZE,
      GRID_SIZE
    );
    this._primaryShape.x = primaryOffset.x;
    this._primaryShape.y = primaryOffset.y;

    const secondaryOffset = calculateCenterOffset(
      this._secondaryShape.width,
      this._secondaryShape.height,
      GRID_SIZE,
      GRID_SIZE
    );
    this._secondaryShape.x = secondaryOffset.x;
    this._secondaryShape.y = secondaryOffset.y;
  }

  private _scaleShapesToFit(): void {
    const maxSize = GRID_SIZE * this._itemSettings.scale;
    const fittedSize = calculateAspectRatioFit(
      this._primaryShape.texture.orig.width,
      this._primaryShape.texture.orig.height,
      maxSize,
      maxSize
    );

    this._primaryShape.width = fittedSize.width;
    this._primaryShape.height = fittedSize.height;
    this._centerShapes();
  }
}
