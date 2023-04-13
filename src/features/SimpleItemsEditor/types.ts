export interface Item {
  name: string;
  filename: string;
  textureDirPath: string;
  settings: ItemSettings;
}

export interface ItemSettings {
  texturePath: string;
  color: string;
  rotation: number;
  scale: number;
  outline: OutlineSettings;
}

export interface OutlineSettings {
  enabled: boolean;
  color: string;
  width: number;
}
