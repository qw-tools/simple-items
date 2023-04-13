import * as PIXI from "pixi.js";
import { publicUrl } from "@/pkg/viteUtil";

const SIZE = 24;

const CHECKED = publicUrl("/assets/img/icons/checked_checkbox_48.png");
const UNCHECKED = publicUrl("/assets/img/icons/unchecked_checkbox_48.png");

export class Checkbox extends PIXI.Container {
  private _isSelected;
  private readonly _selectedImg: PIXI.Sprite;
  private readonly _unselectedImg: PIXI.Sprite;

  constructor(isSelected = false) {
    super();

    this._selectedImg = PIXI.Sprite.from(CHECKED);
    this._selectedImg.width = SIZE;
    this._selectedImg.height = SIZE;

    this._unselectedImg = PIXI.Sprite.from(UNCHECKED);
    this._unselectedImg.width = SIZE;
    this._unselectedImg.height = SIZE;
    this._isSelected = isSelected;
    this._updateTextures();

    this.addChild(this._selectedImg, this._unselectedImg);
  }

  public isSelected(): boolean {
    return this._isSelected;
  }

  public select(): void {
    this._isSelected = true;
    this._updateTextures();
  }

  public deselect(): void {
    this._isSelected = false;
    this._updateTextures();
  }

  public toggle(): void {
    if (this.isSelected()) {
      this.deselect();
    } else {
      this.select();
    }
  }

  private _updateTextures(): void {
    this._selectedImg.visible = this._isSelected;
    this._unselectedImg.visible = !this._isSelected;
  }
}
