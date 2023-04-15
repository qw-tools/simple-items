export interface Item {
  name: string;
  filename: string;
  textureDirPath: string;
  settings: ItemSettings;
  defaultSettings: ItemSettings;
}

export interface ItemSettings {
  texturePath: string;
  color: string;
  primary: {
    rotation: number;
    scale: number;
  };
  outline: OutlineSettings;
}

export interface OutlineSettings {
  enabled: boolean;
  color: string;
  width: number;
}
