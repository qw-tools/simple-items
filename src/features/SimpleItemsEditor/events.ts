export enum Name {
  READY = "Editor.READY",
  SETTINGS_CHANGE = "Editor.SETTINGS_CHANGE",
  SETTINGS_RESET = "Editor.SETTINGS_RESET",
  SELECT_ALL = "Editor.SELECT_ALL",
  SELECT_NONE = "Editor.SELECT_NONE",
  SELECT_INVERT = "Editor.SELECT_INVERT",
  SELECT_CHANGE = "Editor.SELECT_CHANGE",
  DOWNLOAD = "Editor.DOWNLOAD",
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

export interface ChangeDetail {
  property: Prop;
  value: number | string | boolean;
}

export function dispatch(
  name: Name,
  detail: ChangeDetail | object | undefined = undefined
): void {
  let event: CustomEvent;

  if (detail) {
    event = new CustomEvent(name, { detail });
  } else {
    event = new CustomEvent(name);
  }

  document.dispatchEvent(event);
}

export function dispatchChange(detail: ChangeDetail): void {
  dispatch(Name.SETTINGS_CHANGE, detail);
}

export function onSettingsInputChange(e: InputEvent): void {
  dispatchChange(inputEventToDetails(e));
}

function inputEventToDetails(e: InputEvent): ChangeDetail {
  const inputElement = e.target as HTMLInputElement;
  const value =
    inputElement.type === "checkbox"
      ? inputElement.checked
      : inputElement.value;

  return {
    property: parseInt(inputElement.name),
    value,
  };
}
