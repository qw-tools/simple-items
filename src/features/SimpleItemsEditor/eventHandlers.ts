import {
  BackgroundColorChangeEvent,
  OutlineColorChangeEvent,
  OutlineEnabledChangeEvent,
  OutlineWidthChangeEvent,
  ScaleChangeEvent,
} from "@/features/SimpleItemsEditor/pixi/events";

export function onBackgroundColorChange(e): void {
  document.dispatchEvent(
    BackgroundColorChangeEvent((e.target as HTMLInputElement).value)
  );
}

export function onScaleChange(e): void {
  document.dispatchEvent(
    ScaleChangeEvent(parseFloat((e.target as HTMLInputElement).value))
  );
}

export function onOutlineEnabledChange(e): void {
  document.dispatchEvent(
    OutlineEnabledChangeEvent((e.target as HTMLInputElement).checked)
  );
}

export function onOutlineWidthChange(e): void {
  document.dispatchEvent(
    OutlineWidthChangeEvent(parseFloat((e.target as HTMLInputElement).value))
  );
}

export function onOutlineColorChange(e): void {
  document.dispatchEvent(
    OutlineColorChangeEvent((e.target as HTMLInputElement).value)
  );
}
