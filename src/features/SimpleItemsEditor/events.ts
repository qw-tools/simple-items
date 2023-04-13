import { Item } from "@/features/SimpleItemsEditor/types";

export enum Name {
  SETTINGS_CHANGE = "Editor.SETTINGS_CHANGE",
  SETTINGS_RESET = "Editor.SETTINGS_RESET",
  SELECT_ALL = "Editor.SELECT_ALL",
  SELECT_NONE = "Editor.SELECT_NONE",
  SELECT_INVERT = "Editor.SELECT_INVERT",
  SELECT_CHANGE = "Editor.SELECT_CHANGE",
}

export enum Prop {
  COLOR,
  OUTLINE_COLOR,
  OUTLINE_ENABLED,
  OUTLINE_WIDTH,

  PRIMARY_SCALE,
}

export interface ChangeDetails {
  property: Prop;
  value: number | string | boolean;
}

export function createSettingsChange(detail: ChangeDetails): CustomEvent {
  return new CustomEvent(Name.SETTINGS_CHANGE, { detail });
}

export function createSelectionChange(items: Item[]): CustomEvent {
  return new CustomEvent(Name.SELECT_CHANGE, { detail: { items } });
}
