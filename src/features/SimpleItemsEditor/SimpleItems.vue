<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { type Item } from "@/pkg/quake/items";
import { SimpleItemsApp } from "./pixi/SimpleItemsApp";
import { nullOperation } from "@/pkg/functions";

interface Props {
  items: Item[];
  containerId: string;
}

const props = defineProps<Props>();
let editor: SimpleItemsApp;

onMounted(async () => {
  editor = new SimpleItemsApp({
    containerId: props.containerId,
    items: props.items,
    onChange: nullOperation,
    onReady: nullOperation,
  });

  document.getElementById(props.containerId)?.append(editor.getCanvas());
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
    :style="`min-height: ${120}px`"
    class="editor-container fadeIn border border-black/20 shadow-md app-bg-checker cursor-pointer"
  />
</template>
