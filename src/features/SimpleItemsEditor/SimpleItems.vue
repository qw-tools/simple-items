<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { ItemGrid } from "./pixi/ItemGrid";
import { Item } from "@/features/SimpleItemsEditor/types";
import { GRID_SIZE } from "@/features/SimpleItemsEditor/config";

interface Props {
  items: Item[];
  containerId: string;
}

const props = defineProps<Props>();
let editor: ItemGrid;

onMounted(async () => {
  editor = new ItemGrid({
    containerId: props.containerId,
    items: props.items,
  });
});

onBeforeUnmount(() => {
  editor?.destroy();
});

onBeforeMount(() => {
  const dropzoneClass = "editor-canvas";

  const prevent = function (e: DragEvent) {
    e.preventDefault();
    const target = e.target as HTMLElement;

    if (!target.classList.contains(dropzoneClass) && e.dataTransfer) {
      e.dataTransfer.effectAllowed = "none";
      e.dataTransfer.dropEffect = "none";
    }
  };
  window.addEventListener("dragenter", prevent, false);
  window.addEventListener("dragover", prevent);
  window.addEventListener("drop", prevent);
});
</script>

<template>
  <div
    :id="`${props.containerId}`"
    :style="`min-height: ${GRID_SIZE}px`"
    class="editor-container border border-black/20 shadow-md app-bg-checker cursor-pointer"
  />
</template>
