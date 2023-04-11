import { SharedSettings } from "./SharedSettings";
import { Item } from "@/pkg/quake/items";

export enum EditorEvent {
  SHARED_SETTINGS_CHANGE = "Editor.FILTERS_CHANGE",
  ITEM_SELECTED = "Editor.ITEM_SELECTED",
}

export class SharedSettingsChange extends Event {
  settings: SharedSettings;

  constructor(settings: SharedSettings) {
    super(EditorEvent.SHARED_SETTINGS_CHANGE);
    this.settings = settings;
  }
}

export class ItemSelected extends Event {
  item: Item;

  constructor(item: Item) {
    super(EditorEvent.ITEM_SELECTED);
    this.item = item;
  }
}
