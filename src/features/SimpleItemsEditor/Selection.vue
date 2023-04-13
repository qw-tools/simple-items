<script lang="ts" setup>
import * as EE from "@/features/SimpleItemsEditor/events";

function onSelectionChange(e: CustomEvent) {
  console.log("SELECTION CHANGE", e.detail.items);

  const { items } = e.detail;

  switch (items.length) {
    case 0:
      console.log("ZERO");
      break;
    case 1:
      console.log("ONE");
      break;
    default:
      console.log("MANY");
      break;
  }
}

document.addEventListener(EE.Name.SELECT_CHANGE, onSelectionChange);

function onSelectAll(): void {
  document.dispatchEvent(new CustomEvent(EE.Name.SELECT_ALL));
}

function onDeselectAll(): void {
  document.dispatchEvent(new CustomEvent(EE.Name.SELECT_NONE));
}

function onSelectInvert(): void {
  document.dispatchEvent(new CustomEvent(EE.Name.SELECT_INVERT));
}
</script>
<template>
  <div class="flex items-center space-x-2 text-sm justify-center mb-4">
    <button class="p-1.5 px-3" @click="onSelectAll">Select all</button>
    <button class="p-1.5 px-3" @click="onDeselectAll">Deselect all</button>
    <button class="p-1.5 px-3" @click="onSelectInvert">Invert selection</button>
  </div>
</template>
