export enum Name {
  SETTINGS_CHANGE = "Editor.SETTINGS_CHANGE",
  SETTINGS_RESET = "Editor.SETTINGS_RESET",
}

export enum Prop {
  OUTLINE_COLOR,
  OUTLINE_ENABLED,
  OUTLINE_WIDTH,

  PRIMARY_COLOR,
  PRIMARY_SCALE,
  SECONDARY_COLOR,
  SECONDARY_SCALE,
}

export type Value = number | string | boolean;

export interface ChangeDetails {
  property: Prop;
  value: Value;
}

export function createSettingsChange(detail: ChangeDetails): CustomEvent {
  return new CustomEvent(Name.SETTINGS_CHANGE, { detail });
}
