<script lang="ts" setup>
import { ref } from "vue";
import { ITEM_SETTINGS } from "@/features/SimpleItemsEditor/config";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";
import * as EE from "./events";
import { deepCopy } from "@/pkg/dataUtil";

const settings = ref<ItemSettings>(deepCopy(ITEM_SETTINGS));
const defaults = ref<ItemSettings>(deepCopy(ITEM_SETTINGS));

function onChange(e: InputEvent): void {
  const inputElement = e.target as HTMLInputElement;
  const value =
    inputElement.type === "checkbox"
      ? inputElement.checked
      : inputElement.value;

  const changeEvent = EE.createSettingsChange({
    property: parseInt(inputElement.name),
    value,
  });

  document.dispatchEvent(changeEvent);
}

function onReset(): void {
  document.dispatchEvent(new Event(EE.Name.SETTINGS_RESET));
  settings.value = deepCopy(defaults.value);
}

function onSelectionChange(e: CustomEvent): void {
  if (e.detail.items.length === 1) {
    const item: Item = e.detail.items[0];
    settings.value = item.settings;
    defaults.value = item.defaultSettings;
  }
}

document.addEventListener(EE.Name.SELECT_CHANGE, onSelectionChange);
</script>
<template>
  <div class="divide-y divide-black/20">
    <div class="py-3">
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm font-bold">Settings</div>
        <button class="text-sm px-2 py-1" @click="onReset">reset</button>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Color</div>
        <input
          v-model="settings.color"
          :name="EE.Prop.COLOR"
          type="color"
          @input="onChange"
        />
        <span class="text-gray-600 text-xs">{{ settings.color }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">
          <label class="text-sm">
            <input
              v-model="settings.outline.enabled"
              :name="EE.Prop.OUTLINE_ENABLED"
              type="checkbox"
              @change="onChange"
            />
            Outline
          </label>
        </div>

        <label class="text-xs">
          <input
            v-model="settings.outline.color"
            :name="EE.Prop.OUTLINE_COLOR"
            type="color"
            @input="onChange"
          />
        </label>

        <input
          v-model="settings.outline.width"
          :name="EE.Prop.OUTLINE_WIDTH"
          class="w-10 text-sm"
          max="16"
          min="1"
          step="1"
          type="number"
          @input="onChange"
        />
        <span class="text-gray-600 text-xs">px</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Scale</div>
        <input
          v-model="settings.primary.scale"
          :name="EE.Prop.PRIMARY_SCALE"
          class="w-20"
          max="1"
          min="0.1"
          step="0.05"
          type="range"
          @input="onChange"
        />
        <span class="text-gray-600 text-xs">{{ settings.primary.scale }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Rotation</div>
        <input
          v-model="settings.primary.rotation"
          :name="EE.Prop.PRIMARY_ROTATION"
          class="w-20"
          max="180"
          min="-180"
          step="15"
          type="range"
          @input="onChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.primary.rotation
        }}</span>
      </div>
    </div>

    <div class="py-3 space-y-1.5">
      <label class="text-sm flex items-center font-bold">
        <input
          v-model="settings.secondary.enabled"
          :name="EE.Prop.SECONDARY_ENABLED"
          type="checkbox"
          @change="onChange"
        />
        Secondary graphics
      </label>

      <div class="hidden">
        <div class="text-sm w-20">Shape</div>

        <div class="flex flex-cols items-center cursor-pointer">
          <img class="w-7 h-7" src="/assets/img/icons/circle.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/triangle.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/square.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/rhombus.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/pentagon.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/hexagon.png" />
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Scale</div>
        <input
          v-model="settings.secondary.scale"
          :name="EE.Prop.SECONDARY_SCALE"
          class="w-20"
          max="1"
          min="0.1"
          step="0.05"
          type="range"
          @input="onChange"
        />
        <span class="text-gray-600 text-xs">{{
          settings.secondary.scale
        }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Rotation</div>
        <input
          v-model="settings.secondary.rotation"
          :name="EE.Prop.SECONDARY_ROTATION"
          class="w-20"
          max="180"
          min="-180"
          step="15"
          type="range"
          @input="onChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.secondary.rotation
        }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Outer width</div>
        <input
          v-model="settings.secondary.outerScale"
          :name="EE.Prop.SECONDARY_OUTER_SCALE"
          class="w-20"
          max="1"
          min="0.1"
          step="0.05"
          type="range"
          @input="onChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.secondary.outerScale
        }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Inner width</div>
        <input
          v-model="settings.secondary.innerScale"
          :name="EE.Prop.SECONDARY_INNER_SCALE"
          class="w-20"
          max="0.95"
          min="0"
          step="0.05"
          type="range"
          @input="onChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.secondary.innerScale
        }}</span>
      </div>
    </div>
  </div>
</template>
