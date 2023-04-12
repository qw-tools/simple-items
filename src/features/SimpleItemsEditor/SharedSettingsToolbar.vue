<script lang="ts" setup>
import {
  BackgroundColorChangeEvent,
  OutlineColorChangeEvent,
  OutlineEnabledChangeEvent,
  OutlineWidthChangeEvent,
  ScaleChangeEvent,
} from "@/features/SimpleItemsEditor/pixi/events";
import { SETTINGS } from "@/features/SimpleItemsEditor/pixi/config";

function onColorChange(e): void {
  document.dispatchEvent(
    BackgroundColorChangeEvent((e.target as HTMLInputElement).value)
  );
}

function onScaleChange(e): void {
  document.dispatchEvent(
    ScaleChangeEvent(parseFloat((e.target as HTMLInputElement).value))
  );
}

function onOutlineEnabledChange(e): void {
  document.dispatchEvent(
    OutlineEnabledChangeEvent((e.target as HTMLInputElement).checked)
  );
}

function onOutlineWidthChange(e): void {
  document.dispatchEvent(
    OutlineWidthChangeEvent(parseFloat((e.target as HTMLInputElement).value))
  );
}

function onOutlineColorChange(e): void {
  document.dispatchEvent(
    OutlineColorChangeEvent((e.target as HTMLInputElement).value)
  );
}
</script>
<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4">
    <div class="flex items-center space-x-2">
      <label class="text-sm whitespace-nowrap">
        <input
          :checked="SETTINGS.outline.enabled"
          type="checkbox"
          @change="onOutlineEnabledChange"
        />
        <strong>Outline</strong>
      </label>
      <input
        class="w-20"
        max="8"
        min="1"
        step="1"
        type="range"
        @change="onOutlineWidthChange"
      />

      <label class="text-xs whitespace-nowrap">
        <input type="color" @input="onOutlineColorChange" />
      </label>
    </div>

    <div class="flex items-center space-x-2">
      <label class="text-sm whitespace-nowrap">
        <strong>Scale</strong>
      </label>
      <input
        class="w-20"
        max="1"
        min="0.4"
        step="0.05"
        type="range"
        @input="onScaleChange"
      />
    </div>

    <div class="flex items-center space-x-2">
      <label class="text-sm whitespace-nowrap">
        <strong>Color</strong>
      </label>
      <input type="color" @input="onColorChange" />
    </div>
  </div>
</template>
