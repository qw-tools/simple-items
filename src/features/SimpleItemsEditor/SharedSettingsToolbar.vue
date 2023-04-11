<script lang="ts" setup>
import { reactive, watch } from "vue";
import _throttle from "lodash.throttle";
import {
  SharedSettings,
  getDefaultSharedSettings,
} from "./pixi/SharedSettings";

interface Props {
  onChange: (newFilters: SharedSettings, oldFilters: SharedSettings) => void;
}

const props = defineProps<Props>();
const settings: SharedSettings = reactive(getDefaultSharedSettings());

watch(settings, _throttle(props.onChange, 50));
</script>
<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4">
    <div class="flex items-center space-x-2">
      <label class="text-sm whitespace-nowrap">
        <input v-model="settings.outline.enabled" type="checkbox" />
        <strong>Outline</strong>
      </label>
      <input
        v-model.number="settings.outline.size"
        max="8"
        min="1"
        step="1"
        class="w-20"
        type="range"
      />

      <label class="text-xs whitespace-nowrap">
        <input v-model="settings.outline.color" type="color" />
      </label>
    </div>

    <div class="flex items-center space-x-2">
      <label class="text-sm whitespace-nowrap">
        <strong>Scale</strong>
      </label>
      <input
        v-model.number="settings.scale.value"
        max="1"
        min="0.4"
        step="0.05"
        class="w-20"
        type="range"
      />
    </div>
  </div>
</template>
