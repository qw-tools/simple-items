<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { type SimpleItem } from "@/pkg/quake/simpleItems";
import { TextureEditor } from "./pixi/TextureEditor";
import { FilterInputs } from "./pixi/filter";
import { publicUrl } from "@/pkg/viteUtil";

interface Props {
  item: SimpleItem;
  filters: FilterInputs;
  containerId: string;
}

const props = defineProps<Props>();

let editor: TextureEditor;

function onBackgroundColorChange(e: Event): void {
  editor.backgroundColor = (e.target as HTMLInputElement).value;
}

onMounted(async () => {
  console.log("onMounted", props.item);

  const { backgroundColor, filename } = props.item;

  editor = new TextureEditor({
    containerId: props.containerId,
    texturePath: publicUrl(`/assets/textures/${filename}`),
    backgroundColor,
    onChange: async () => {
      console.log("change");
    },
    onReady: () => {
      console.log("ready");
    },
  });

  document.getElementById(props.containerId)?.append(editor.getCanvas());
});

onBeforeUnmount(() => {
  editor?.destroy();
});

onBeforeMount(() => {
  const dropzoneClass = "app-dropzone";

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
  <div>
    <div class="text-sm font-mono text-xs hidden">
      <span class="text-gray-500">{{ props.item.texturePath }}/</span
      ><strong>{{ props.item.filename }}</strong>
    </div>

    <!--    <button-->
    <!--      class="block border border-gray-400 hover:bg-blue-100 rounded-md py-1.5 px-3 bg-sky-100 shadow text-sm ml-auto"-->
    <!--      @click="() => editor?.download(props.item.filename)"-->
    <!--    >-->
    <!--      Download-->
    <!--    </button>-->

    <div class="p-2 border">
      <div
        :style="`width: ${160 + 4}px; height: ${160 + 4}px`"
        class="app-bg-checker app-border-dashed"
      >
        <div
          :id="`${props.containerId}`"
          class="editor-container cursor-pointer"
          :title="`Download to ${props.item.texturePath}`"
          @click="() => editor.download(props.item.filename)"
        />
      </div>
      <input
        type="color"
        @input="onBackgroundColorChange"
        class="w-4 h-4 rounded"
        :value="props.item.backgroundColor"
      />
    </div>
  </div>
</template>
