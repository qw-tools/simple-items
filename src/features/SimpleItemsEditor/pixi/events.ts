export enum EditorEvent {
  BACKGROUND_COLOR = "Editor.BACKGROUND_COLOR",
  OUTLINE_COLOR = "Editor.OUTLINE_COLOR",
  OUTLINE_ENABLED = "Editor.OUTLINE_ENABLED",
  OUTLINE_WIDTH = "Editor.OUTLINE_WIDTH",
  SCALE = "Editor.SCALE",
}

function createCustomEvent(name, value): CustomEvent {
  return new CustomEvent(name, { detail: { value } });
}

// scale
export function ScaleChangeEvent(value: number): CustomEvent {
  return createCustomEvent(EditorEvent.SCALE, value);
}

// color
export function BackgroundColorChangeEvent(value: string): CustomEvent {
  return createCustomEvent(EditorEvent.BACKGROUND_COLOR, value);
}

// outline
export function OutlineColorChangeEvent(value: string): CustomEvent {
  return createCustomEvent(EditorEvent.OUTLINE_COLOR, value);
}

export function OutlineEnabledChangeEvent(value: boolean): CustomEvent {
  return createCustomEvent(EditorEvent.OUTLINE_ENABLED, value);
}

export function OutlineWidthChangeEvent(value: number): CustomEvent {
  return createCustomEvent(EditorEvent.OUTLINE_WIDTH, value);
}
