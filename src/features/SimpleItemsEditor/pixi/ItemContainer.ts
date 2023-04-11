import * as PIXI from "pixi.js";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import { calculateAspectRatioFit, calculateCenterOffset } from "@/pkg/geometry";
import { publicUrl } from "@/pkg/viteUtil";

const GRID_SIZE = 120;

type ItemContainerSettings = {
  size: number;
  scale: number;
  backgroundColor: string;
  innerTexture: PIXI.Texture;
  outerShapeType: string;
};

export class ItemContainer extends PIXI.Container {
  private readonly _colorOverlay: ColorOverlayFilter = new ColorOverlayFilter();
  private readonly _outline: OutlineFilter = new OutlineFilter(2, 0x000000, 1);
  private _innerShape: PIXI.Sprite = new PIXI.Sprite();
  private _itemScale = 0.8;
  private _shapeLayer: PIXI.Container = new PIXI.Container();
  private _background: PIXI.Graphics = new PIXI.Graphics();
  private readonly _checkbox: PIXI.Sprite = new PIXI.Sprite();
  private _isSelected = false;

  constructor(settings: ItemContainerSettings) {
    super();

    this.hitArea = new PIXI.Rectangle(0, 0, GRID_SIZE, GRID_SIZE);

    // background
    this._background.beginFill(0x3366ff, 0.12);
    this._background.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    this._background.endFill();
    this._background.visible = false;
    this.addChild(this._background);

    // shapes
    this._shapeLayer.addChild(this._innerShape);
    this._shapeLayer.filters = [this._colorOverlay, this._outline];
    this.addChild(this._shapeLayer);

    this.itemBackgroundColor = settings.backgroundColor;
    this.itemTexture = settings.innerTexture;
    this.itemScale = settings.scale;

    // checkbox
    this._checkbox = PIXI.Sprite.from(
      publicUrl("/assets/img/icons/icons8-ok-48.png")
    );
    this._checkbox.visible = false;
    this._checkbox.width = 24;
    this._checkbox.height = 24;
    this._checkbox.position.set(GRID_SIZE - 32, GRID_SIZE - 32);
    this.addChild(this._checkbox);

    // events
    this._listen();
  }

  set itemBackgroundColor(value: string) {
    this._colorOverlay.color = new PIXI.Color(value).toNumber();
  }

  get itemOutline(): OutlineFilter {
    return this._outline;
  }

  set itemScale(value: number) {
    this._itemScale = value;

    this._scaleInnerTextureToFit();
  }

  private toggleSelected(): void {
    this._isSelected = !this._isSelected;
    this._checkbox.visible = this._isSelected;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  private _listen(): void {
    this.eventMode = "static";

    this.addEventListener("click", () => {
      console.log("click");
      //container.classList.add("editor-drag");
      this.toggleSelected();
    });

    this.addEventListener("mouseover", () => {
      console.log("mouseover");
      if (this.isSelected) {
        return;
      }
      this._background.visible = true;
    });
    this.addEventListener("mouseleave", () => {
      console.log("mouseleave");
      if (this.isSelected) {
        return;
      }

      this._background.visible = false;
    });

    this.addEventListener("dragenter", () => {
      console.log("dragenter");
      //container.classList.add("editor-drag");
    });
    this.addEventListener("dragleave", () => {
      console.log("dragenter");
      //container.classList.remove("editor-drag");
    });
  }

  private _centerInnerTexture(): void {
    const centerOffset = calculateCenterOffset(
      this._innerShape.width,
      this._innerShape.height,
      GRID_SIZE,
      GRID_SIZE
    );

    this._innerShape.x = centerOffset.x;
    this._innerShape.y = centerOffset.y;
  }

  private _scaleInnerTextureToFit(): void {
    const fittedSize = calculateAspectRatioFit(
      this._innerShape.texture.orig.width,
      this._innerShape.texture.orig.height,
      GRID_SIZE * this._itemScale,
      GRID_SIZE * this._itemScale
    );

    this._innerShape.width = fittedSize.width;
    this._innerShape.height = fittedSize.height;
    this._centerInnerTexture();
  }

  set itemTexture(texture: PIXI.Texture) {
    this._innerShape?.destroy();
    this._innerShape = PIXI.Sprite.from(texture);
    this._scaleInnerTextureToFit();
    this._shapeLayer.addChild(this._innerShape);
  }
}
