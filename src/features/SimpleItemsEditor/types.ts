export interface Item {
  name: string;
  filename: string;
  textureDirPath: string;
  settings: ItemSettings;
  defaultSettings: ItemSettings;
}

export type GraphicsShape = "square" | "circle" | "hexagon" | "rounded_square";

export interface SecondarySettings {
  enabled: boolean;
  shape: GraphicsShape;
  rotation: number;
  scale: number;
  outerScale: number;
  innerScale: number;
}

export interface ItemSettings {
  texturePath: string;
  color: string;
  primary: {
    rotation: number;
    scale: number;
  };
  secondary: SecondarySettings;
  outline: OutlineSettings;
}

export interface OutlineSettings {
  enabled: boolean;
  color: string;
  width: number;
}
