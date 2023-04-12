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

    this.addChild(this._selectedImg, this._unselectedImg);
  }

  public toggle(): void {
    this._isSelected = !this._isSelected;
    this._selectedImg.visible = this._isSelected;
    this._unselectedImg.visible = !this._isSelected;
  }
}
