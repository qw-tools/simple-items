import * as PIXI from "pixi.js";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import { calculateAspectRatioFit } from "@/pkg/geometry";
import { Checkbox } from "@/features/SimpleItemsEditor/pixi/Checkbox";
import { ITEM_CENTER, ITEM_SIZE } from "@/features/SimpleItemsEditor/config";
import {
  GraphicsShape,
  Item,
  ItemSettings,
} from "@/features/SimpleItemsEditor/types";
import { deepCopy } from "@/pkg/dataUtil";
import { SmoothGraphics } from "@pixi/graphics-smooth";
import { createSecondaryGraphics } from "@/features/SimpleItemsEditor/pixi/secondaryGraphics";

export class ItemTile extends PIXI.Container {
  private readonly _item: Item;
  private readonly _colorOverlay: ColorOverlayFilter = new ColorOverlayFilter();
  private readonly _outline: OutlineFilter = new OutlineFilter(2, 0x000000, 1);
  private readonly _checkbox: Checkbox = new Checkbox();
  private _shapeLayer: PIXI.Container = new PIXI.Container();
  private _primaryShape: PIXI.Sprite = new PIXI.Sprite();
  private _primaryShapeLayer: PIXI.Container = new PIXI.Container();
  private _secondaryShape: SmoothGraphics = new SmoothGraphics();
  private _secondaryShapeLayer: PIXI.Container = new PIXI.Container();
  private _background: PIXI.Graphics = new PIXI.Graphics();

  constructor(item: Item) {
    super();

    // stage
    this.hitArea = new PIXI.Rectangle(0, 0, ITEM_SIZE, ITEM_SIZE);

    // background
    this._background.beginFill(0x3366ff, 0.12);
    this._background.drawRect(0, 0, ITEM_SIZE, ITEM_SIZE);
    this._background.endFill();
    this._background.visible = false;
    this.addChild(this._background);

    // shape layers
    this.addChild(this._shapeLayer);
    this._primaryShapeLayer.filters = [this._colorOverlay, this._outline];

    this._shapeLayer.addChild(
      this._secondaryShapeLayer,
      this._primaryShapeLayer
    );

    // mask (prevent content overflow)
    const shapeMask = new PIXI.Graphics();
    shapeMask.beginFill();
    shapeMask.drawRect(0, 0, ITEM_SIZE, ITEM_SIZE);
    shapeMask.endFill();
    this._shapeLayer.addChild(shapeMask);
    this._shapeLayer.mask = shapeMask;

    // item
    this._item = deepCopy(item);
    this.applySettings(this._item.defaultSettings);

    // checkbox
    this._checkbox.visible = false;
    const checkboxPos: number = ITEM_SIZE - 28;
    this._checkbox.position.set(checkboxPos, checkboxPos);
    this.addChild(this._checkbox);

    // events
    this._listen();
  }

  get shapeLayer(): PIXI.Container {
    return this._shapeLayer;
  }

  get item(): Item {
    return this._item;
  }

  set outlineEnabled(value: boolean) {
    this._item.settings.outline.enabled = value;
    this._outline.enabled = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set outlineColor(value: string) {
    this._item.settings.outline.color = value;
    this._outline.color = new PIXI.Color(value).toNumber();
    this._updateSecondaryGraphics(this._item.settings);
  }

  set outlineWidth(value: number) {
    this._item.settings.outline.width = value;
    this._outline.thickness = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set color(value: string) {
    this._item.settings.color = value;
    this._colorOverlay.color = new PIXI.Color(value).toNumber();
    this._updateSecondaryGraphics(this._item.settings);
  }

  set primaryScale(value: number) {
    this._item.settings.primary.scale = value;
    this._scalePrimaryToFit();
  }

  set primaryRotation(value: number) {
    this._item.settings.primary.rotation = value;
    this._primaryShape.rotation = value * (Math.PI / 180);
  }

  set primaryTexture(source: PIXI.SpriteSource) {
    this._item.settings.texturePath = source.toString();

    const newSprite = PIXI.Sprite.from(source);
    const loadGraceTimeout = 64; // ms

    window.setTimeout(() => {
      this._primaryShape?.destroy();
      this._primaryShape = newSprite;
      this._primaryShape.anchor.set(0.5);
      this._primaryShape.position.set(ITEM_CENTER.x, ITEM_CENTER.y);
      this._scalePrimaryToFit();
      this._primaryShapeLayer.addChild(this._primaryShape);
    }, loadGraceTimeout);
  }

  set secondaryEnabled(value: boolean) {
    this._item.settings.secondary.enabled = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set secondaryShape(value: GraphicsShape) {
    this._item.settings.secondary.shape = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set secondaryScale(value: number) {
    this._item.settings.secondary.scale = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set secondaryOuterScale(value: number) {
    this._item.settings.secondary.outerScale = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set secondaryInnerScale(value: number) {
    this._item.settings.secondary.innerScale = value;
    this._updateSecondaryGraphics(this._item.settings);
  }

  set secondaryRotation(value: number) {
    this._item.settings.secondary.rotation = value;
    this._secondaryShape.rotation = value * (Math.PI / 180);
  }

  private _updateSecondaryGraphics(settings: ItemSettings): void {
    this._secondaryShape.destroy(true);
    this._secondaryShape = createSecondaryGraphics(settings);
    this._secondaryShapeLayer.addChild(this._secondaryShape);
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

  public isSelected(): boolean {
    return this._checkbox.isSelected();
  }

  public applySettings(settings: ItemSettings): void {
    this.color = settings.color;

    this.primaryTexture = settings.texturePath;
    this.primaryScale = settings.primary.scale;
    this.primaryRotation = settings.primary.rotation;

    this.outlineEnabled = settings.outline.enabled;
    this.outlineColor = settings.outline.color;
    this.outlineWidth = settings.outline.width;

    this._updateSecondaryGraphics(settings);
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

      if (!this.isSelected()) {
        this._unfocus();
      }
    });
  }

  private _scalePrimaryToFit(): void {
    const { width, height } = this._primaryShape.texture.orig;
    const maxSize = ITEM_SIZE * this._item.settings.primary.scale;
    const fittedSize = calculateAspectRatioFit(width, height, maxSize, maxSize);
    this._primaryShape.width = fittedSize.width;
    this._primaryShape.height = fittedSize.height;
  }
}
