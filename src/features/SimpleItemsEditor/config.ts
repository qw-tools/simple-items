import { ItemSettings } from "@/features/SimpleItemsEditor/types";

export const GRID_SIZE = 120;
export const GRID_CENTER = { x: GRID_SIZE / 2, y: GRID_SIZE / 2 };

export const ITEM_SETTINGS: ItemSettings = {
  texturePath: "",
  color: "#ff0000",
  rotation: 0,
  scale: 0.8,
  outline: {
    enabled: true,
    color: "#000000",
    width: 2,
  },
};
