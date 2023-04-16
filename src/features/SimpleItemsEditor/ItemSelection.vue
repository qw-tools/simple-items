<script lang="ts" setup>
import * as EE from "@/features/SimpleItemsEditor/events";
import { ref } from "vue";

const selectedCount = ref<number>(0);

function onSelectionChange(e: CustomEvent) {
  selectedCount.value = e.detail.items.length;
}

document.addEventListener(EE.Name.SELECT_CHANGE, onSelectionChange);

const onSelectAll = () => dispatch(EE.Name.SELECT_ALL);
const onDeselectAll = () => dispatch(EE.Name.SELECT_NONE);
const onSelectInvert = () => dispatch(EE.Name.SELECT_INVERT);
</script>
<template>
  <div class="flex items-center space-x-3 text-sm justify-center mb-4">
    <button class="flex items-center p-1.5 px-2" @click="onSelectAll">
      <img
        class="w-5 h-5 mr-1"
        src="/assets/img/icons/checked_checkbox_48.png"
      />
      Select all
    </button>
    <button
      :disabled="0 === selectedCount"
      class="flex items-center p-1.5 px-2"
      @click="onDeselectAll"
    >
      <img
        class="w-5 h-5 mr-1"
        src="/assets/img/icons/unchecked_checkbox_48.png"
      />
      Deselect all
    </button>
    <button class="flex items-center p-1.5 px-2" @click="onSelectInvert">
      <img class="w-5 h-5 mr-1" src="/assets/img/icons/alternate_48.png" />
      Invert selection
    </button>
  </div>
</template>
