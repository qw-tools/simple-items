import { ItemSettings } from "@/features/SimpleItemsEditor/types";
import { SmoothGraphics } from "@pixi/graphics-smooth";
import { GRID_CENTER, GRID_SIZE } from "@/features/SimpleItemsEditor/config";
import { getPolygonPath } from "@/pkg/geometry";

export function createSecondaryGraphics(
  settings: ItemSettings
): SmoothGraphics {
  // general
  const gfx = new SmoothGraphics();

  if (!settings.secondary.enabled) {
    return gfx;
  }

  gfx.position.set(GRID_CENTER.x, GRID_CENTER.y);
  gfx.scale.set(settings.secondary.scale);
  gfx.rotation = settings.secondary.rotation * (Math.PI / 180);

  // outline
  if (settings.outline.enabled) {
    const outlineWidth = Math.round(
      settings.outline.width / settings.secondary.scale
    );
    gfx.lineStyle(outlineWidth, settings.outline.color, 1, 1);
  }

  // outer
  const { shape, outerScale } = settings.secondary;
  const oSize = GRID_SIZE * outerScale;
  const oRadius = oSize / 2;

  gfx.beginFill(settings.color);

  if ("circle" === shape) {
    gfx.drawCircle(0, 0, oRadius);
  } else if ("square" === shape) {
    gfx.drawRect(-oRadius, -oRadius, oSize, oSize);
  } else if ("rounded_square" === shape) {
    const radius = Math.round(oRadius * 0.24);
    gfx.drawRoundedRect(-oRadius, -oRadius, oSize, oSize, radius);
  } else {
    // hexagon
    const path = getPolygonPath(6).map((n: number) => n * oRadius);
    gfx.drawPolygon(path);
  }

  gfx.endFill();

  // inner
  const { innerScale } = settings.secondary;

  if (innerScale > 0) {
    const iSize = innerScale * oSize;
    const iRadius = iSize / 2;

    gfx.beginHole();

    if ("circle" === shape) {
      gfx.drawCircle(0, 0, iRadius);
    } else if ("square" === shape) {
      gfx.drawRect(-iRadius, -iRadius, iSize, iSize);
    } else if ("rounded_square" === shape) {
      const radius = Math.round(iRadius * 0.16);
      gfx.drawRoundedRect(-iRadius, -iRadius, iSize, iSize, radius);
    } else {
      // hexagon
      gfx.drawPolygon(getPolygonPath(6).map((n: number) => n * iRadius));
    }

    gfx.endHole();
  }

  return gfx;
}
