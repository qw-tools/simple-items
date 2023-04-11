import { SharedSettings } from "./SharedSettings";

export enum EditorEvent {
  SHARED_SETTINGS_CHANGE = "Editor.FILTERS_CHANGE",
}

export class SharedSettingsChange extends Event {
  settings: SharedSettings;

  constructor(filters: SharedSettings) {
    super(EditorEvent.SHARED_SETTINGS_CHANGE);
    this.settings = filters;
  }
}
