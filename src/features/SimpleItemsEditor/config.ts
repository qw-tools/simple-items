import { ItemSettings } from "@/features/SimpleItemsEditor/types";

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_MARGIN = 24;

export const GRID_COLUMNS_MIN = 3;

export const GRID_SIZE = 160;
export const GRID_CENTER = { x: GRID_SIZE / 2, y: GRID_SIZE / 2 };
export const GRID_DIM = { width: GRID_SIZE, height: GRID_SIZE };

export const ITEM_SETTINGS: ItemSettings = {
  texturePath: "",
  color: "#ff0000",
  primary: {
    rotation: 0,
    scale: 0.8,
  },
  secondary: {
    enabled: false,
    shape: "square",
    rotation: 0,
    scale: 0.6,
    outerScale: 1.0,
    innerScale: 0.8,
  },
  outline: {
    enabled: true,
    color: "#000000",
    width: 2,
  },
};
