export interface Item {
  name: string;
  filename: string;
  textureDirPath: string;
  defaultSettings: ItemSettings;
}

export interface ItemSettings {
  texturePath: string;
  scale: number;
  color: string;
  outline: OutlineSettings;
}

export interface OutlineSettings {
  enabled: boolean;
  color: string;
  width: number;
}
