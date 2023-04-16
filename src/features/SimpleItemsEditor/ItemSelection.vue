<script lang="ts" setup>
import * as EE from "@/features/SimpleItemsEditor/events";
import { dispatch } from "@/features/SimpleItemsEditor/events";
import { ref } from "vue";

const selectedCount = ref<number>(0);

document.addEventListener(EE.Name.SELECT_CHANGE, function (e: CustomEvent) {
  selectedCount.value = e.detail.items.length;
});

const onSelectAll = () => dispatch(EE.Name.SELECT_ALL);
const onDeselectAll = () => dispatch(EE.Name.SELECT_NONE);
const onSelectInvert = () => dispatch(EE.Name.SELECT_INVERT);
const onDownloadSelected = () => dispatch(EE.Name.DOWNLOAD);
</script>
<template>
  <div class="flex items-center space-x-2 text-sm justify-center mb-4">
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

    <div class="w-6"></div>

    <button class="flex items-center p-1.5 px-2" @click="onDownloadSelected">
      <img class="w-5 h-5 mr-1" src="/assets/img/icons/download_48.png" />
      Download
      <span class="text-xs text-gray-600 ml-1"
        >({{ selectedCount === 0 ? "all" : selectedCount }})</span
      >
    </button>
  </div>
</template>
