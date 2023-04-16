<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { SimpleItemsApp } from "./pixi/SimpleItemsApp";
import { nullOperation } from "@/pkg/functions";
import { Item } from "@/features/SimpleItemsEditor/types";
import * as EE from "@/features/SimpleItemsEditor/events";

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
    onReady: () => {
      document.dispatchEvent(new CustomEvent(EE.Name.SELECT_ALL));
    },
  });

  document.getElementById(props.containerId)?.append(editor._getCanvas());
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
