import { ItemSettings } from "@/features/SimpleItemsEditor/types";

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_MARGIN = 24;

export const GRID_COLUMNS_MIN = 3;

export const ITEM_SIZE = 160;
export const ITEM_CENTER = { x: ITEM_SIZE / 2, y: ITEM_SIZE / 2 };
export const ITEM_DIM = { width: ITEM_SIZE, height: ITEM_SIZE };

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
    scale: 0.65,
    outerScale: 1.0,
    innerScale: 0.75,
  },
  outline: {
    enabled: true,
    color: "#000000",
    width: 2,
  },
};
