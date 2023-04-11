import * as PIXI from "pixi.js";
import { ColorOverlayFilter } from "pixi-filters";
import { calculateAspectRatioFit, calculateCenterOffset } from "@/pkg/geometry";

const GRID_SIZE = 120;

type ItemContainerSettings = {
  size: number;
  scale: number;
  backgroundColor: string;
  innerTexture: PIXI.Texture;
  outerShapeType: string;
};

export class ItemContainer extends PIXI.Container {
  private readonly _colorOverlayFilter: ColorOverlayFilter =
    new ColorOverlayFilter();
  private _innerTextureSprite: PIXI.Sprite = new PIXI.Sprite();
  private _itemScale = 0.8;
  private _textureContainer: PIXI.Container = new PIXI.Container();

  constructor(settings: ItemContainerSettings) {
    super();

    this._textureContainer.addChild(this._innerTextureSprite);
    this._textureContainer.filters = [this._colorOverlayFilter];
    this.addChild(this._textureContainer);

    this.backgroundColor = settings.backgroundColor;
    this.texture = settings.innerTexture;
    this.itemScale = settings.scale;
  }

  set backgroundColor(value: string) {
    this._colorOverlayFilter.color = new PIXI.Color(value).toNumber();
  }

  set itemScale(value: number) {
    this._itemScale = value;

    this._scaleInnerTextureToFit();
  }

  private _centerInnerTexture(): void {
    const centerOffset = calculateCenterOffset(
      this._innerTextureSprite.width,
      this._innerTextureSprite.height,
      GRID_SIZE,
      GRID_SIZE
    );

    this._innerTextureSprite.x = centerOffset.x;
    this._innerTextureSprite.y = centerOffset.y;
  }

  private _scaleInnerTextureToFit(): void {
    const fittedSize = calculateAspectRatioFit(
      this._innerTextureSprite.texture.orig.width,
      this._innerTextureSprite.texture.orig.height,
      GRID_SIZE * this._itemScale,
      GRID_SIZE * this._itemScale
    );

    this._innerTextureSprite.width = fittedSize.width;
    this._innerTextureSprite.height = fittedSize.height;
    this._centerInnerTexture();
  }

  set texture(texture: PIXI.Texture) {
    this._innerTextureSprite?.destroy();
    this._innerTextureSprite = PIXI.Sprite.from(texture);
    this._scaleInnerTextureToFit();
    this._textureContainer.addChild(this._innerTextureSprite);
  }
}
