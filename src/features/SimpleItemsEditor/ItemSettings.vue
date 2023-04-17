<script lang="ts" setup>
import { ref } from "vue";
import { ITEM_SETTINGS } from "@/features/SimpleItemsEditor/config";
import {
  GraphicsShape,
  Item,
  ItemSettings,
} from "@/features/SimpleItemsEditor/types";
import * as EE from "./events";
import { dispatch, dispatchChange, onSettingsInputChange } from "./events";
import { deepCopy } from "@/pkg/dataUtil";
import classNames from "classnames";
import { publicUrl } from "@/pkg/viteUtil";

const settings = ref<ItemSettings>(deepCopy(ITEM_SETTINGS));
const defaults = ref<ItemSettings>(deepCopy(ITEM_SETTINGS));

function onReset(): void {
  dispatch(EE.Name.SETTINGS_RESET);
  settings.value = deepCopy(defaults.value);
}

function onSelectionChange(e: CustomEvent): void {
  if (e.detail.items.length === 1) {
    const item: Item = e.detail.items[0];
    settings.value = item.settings;
    defaults.value = item.defaultSettings;
  }
}

function setShape(value: GraphicsShape): void {
  dispatchChange({ property: EE.Prop.SECONDARY_SHAPE, value });
  settings.value.secondary.shape = value;
}

document.addEventListener(EE.Name.SELECT_CHANGE, onSelectionChange);

const shapes: GraphicsShape[] = [
  "square",
  "rounded_square",
  "circle",
  "hexagon",
];
</script>
<template>
  <div class="divide-y divide-black/20">
    <div class="pb-4">
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm font-bold">Settings</div>
        <button class="text-xs px-2 py-1" @click="onReset">Reset</button>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Color</div>
        <input
          v-model="settings.color"
          :name="EE.Prop.COLOR"
          type="color"
          @input="onSettingsInputChange"
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
              @change="onSettingsInputChange"
            />
            Outline
          </label>
        </div>

        <label class="text-xs">
          <input
            v-model="settings.outline.color"
            :name="EE.Prop.OUTLINE_COLOR"
            type="color"
            @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.primary.rotation
        }}</span>
      </div>
    </div>

    <div class="pt-4 space-y-1.5">
      <label class="text-sm flex items-center font-bold">
        <input
          v-model="settings.secondary.enabled"
          :name="EE.Prop.SECONDARY_ENABLED"
          type="checkbox"
          @change="onSettingsInputChange"
        />
        Secondary graphics
      </label>

      <div class="flex items-center space-x-1">
        <div class="text-sm w-20">Shape</div>

        <img
          v-for="shape in shapes"
          :key="shape"
          class="w-6 h-6 cursor-pointer grayscale"
          :src="publicUrl(`/assets/img/icons/${shape}_48.png`)"
          :class="
            classNames({
              'grayscale-0': settings.secondary.shape === shape,
            })
          "
          @click.prevent="() => setShape(shape)"
        />
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
          @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
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
          @input="onSettingsInputChange"
        />

        <span class="text-gray-600 text-xs">{{
          settings.secondary.innerScale
        }}</span>
      </div>
    </div>
  </div>
</template>
