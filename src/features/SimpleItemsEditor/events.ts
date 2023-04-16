import { Item } from "@/features/SimpleItemsEditor/types";
import { deepCopy } from "@/pkg/dataUtil";

export enum Name {
  SETTINGS_CHANGE = "Editor.SETTINGS_CHANGE",
  SETTINGS_RESET = "Editor.SETTINGS_RESET",
  SELECT_ALL = "Editor.SELECT_ALL",
  SELECT_NONE = "Editor.SELECT_NONE",
  SELECT_INVERT = "Editor.SELECT_INVERT",
  SELECT_CHANGE = "Editor.SELECT_CHANGE",
  DOWNLOAD = "Editor.DOWNLOAD_SELECTED",
}

export enum Prop {
  COLOR,
  OUTLINE_COLOR,
  OUTLINE_ENABLED,
  OUTLINE_WIDTH,

  PRIMARY_ROTATION,
  PRIMARY_SCALE,

  SECONDARY_ENABLED,
  SECONDARY_SHAPE,
  SECONDARY_ROTATION,
  SECONDARY_SCALE,
  SECONDARY_OUTER_SCALE,
  SECONDARY_INNER_SCALE,
}

export interface ChangeDetails {
  property: Prop;
  value: number | string | boolean;
}

export function createSettingsChange(detail: ChangeDetails): CustomEvent {
  return new CustomEvent(Name.SETTINGS_CHANGE, { detail: deepCopy(detail) });
}

export function createSelectionChange(items: Item[]): CustomEvent {
  return new CustomEvent(Name.SELECT_CHANGE, {
    detail: { items: deepCopy(items) },
  });
}

export function dispatch(name: Name): void {
  document.dispatchEvent(new CustomEvent(name));
}
