import * as PIXI from "pixi.js";
import { Point2D } from "./geometry";

export function eventToPosition(e: PIXI.FederatedMouseEvent): Point2D {
  return { x: e.global.x, y: e.global.y };
}
