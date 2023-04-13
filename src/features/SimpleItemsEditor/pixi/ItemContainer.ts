import * as PIXI from "pixi.js";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import { calculateAspectRatioFit, calculateCenterOffset } from "@/pkg/geometry";
import { Checkbox } from "@/features/SimpleItemsEditor/pixi/Checkbox";
import { GRID_SIZE } from "@/features/SimpleItemsEditor/config";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";

export class ItemContainer extends PIXI.Container {
  private readonly _item: Item;
  private readonly _colorOverlay: ColorOverlayFilter = new ColorOverlayFilter();
  private readonly _outline: OutlineFilter = new OutlineFilter(2, 0x000000, 1);
  private _primaryShape: PIXI.Sprite = new PIXI.Sprite();
  private _secondaryShape: PIXI.Graphics = new PIXI.Graphics();
  private _primaryScale = 0.8;
  private _shapeLayer: PIXI.Container = new PIXI.Container();
  private _background: PIXI.Graphics = new PIXI.Graphics();
  private readonly _checkbox: Checkbox = new Checkbox();
  private _isSelected = false;

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
    this.resetSettings();

    // checkbox
    this._checkbox.visible = false;
    this._checkbox.position.set(GRID_SIZE - 28, GRID_SIZE - 28);
    this.addChild(this._checkbox);

    // events
    this._listen();
  }

  get outline(): OutlineFilter {
    return this._outline;
  }

  set primaryColor(value: string) {
    this._colorOverlay.color = new PIXI.Color(value).toNumber();
  }

  set primaryScale(value: number) {
    this._primaryScale = value;

    this._scaleShapesToFit();
  }

  set primaryTexture(source: PIXI.SpriteSource) {
    console.log("source", source);

    this._primaryShape?.destroy();
    this._primaryShape = PIXI.Sprite.from(source);
    this._scaleShapesToFit();
    this._shapeLayer.addChild(this._primaryShape);
  }

  private toggleSelected(): void {
    this._isSelected = !this._isSelected;
    this._checkbox.toggle();
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  public applySettings(settings: ItemSettings): void {
    this.primaryScale = settings.scale;
    this.primaryColor = settings.color;
    this.primaryTexture = settings.texturePath;
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

    this.addEventListener("click", (e: MouseEvent) => {
      stopEvent(e);
      this.toggleSelected();
    });

    this.addEventListener("mouseover", (e: MouseEvent) => {
      stopEvent(e);

      if (this.isSelected) {
        return;
      }
      this._checkbox.visible = true;
      this._background.visible = true;
    });
    this.addEventListener("mouseleave", (e: MouseEvent) => {
      stopEvent(e);

      if (this.isSelected) {
        return;
      }

      this._background.visible = false;
      this._checkbox.visible = false;
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
    const fittedSize = calculateAspectRatioFit(
      this._primaryShape.texture.orig.width,
      this._primaryShape.texture.orig.height,
      GRID_SIZE * this._primaryScale,
      GRID_SIZE * this._primaryScale
    );

    this._primaryShape.width = fittedSize.width;
    this._primaryShape.height = fittedSize.height;
    this._centerShapes();
  }
}
