<script lang="ts" setup>
import { FilterInputs, getDefaultFilterInputs } from "./pixi/filter";
import { FiltersChange } from "./pixi/events";
import SiteHeader from "@/Site/SiteHeader.vue";
import SiteFooter from "@/Site/SiteFooter.vue";
import TextureEditor from "./TextureEditor.vue";
import FilterToolbar from "./FilterToolbar.vue";
import {
  ammo,
  armors,
  healthPacks,
  powerups,
  SimpleItem,
  weapons,
} from "@/pkg/quake/simpleItems";
import { slugify } from "@/pkg/stringUtil";
import { ref } from "vue";

const editOptions = {
  weapons: [weapons, ammo].flat(1),
  other: [armors, healthPacks, powerups].flat(1),
};

const items = ref<SimpleItem[]>(editOptions.weapons);

let lastFilters: FilterInputs = getDefaultFilterInputs();

function onFiltersChange(filters: FilterInputs): void {
  document.dispatchEvent(new FiltersChange(filters));
  lastFilters = filters;
}
</script>
<template>
  <SiteHeader current-app="simple-items" />

  <div class="bg-gray-100 border-b border-gray-300">
    <div class="bg-white shadow">
      <div class="container">
        <h1 class="font-bold text-xl py-4">
          Simple Items Texture Editor
          <span
            class="rounded-lg bg-yellow-200 font-normal px-2 py-1 ml-4 border text-sm font-mono"
            >work in progress!</span
          >
        </h1>
      </div>
    </div>

    <div class="container my-4">
      <div
        class="my-4 px-4 py-3 rounded border shadow bg-white grid gap-2 sm:gap-8 sm:grid-flow-col sm:auto-cols-max"
      >
        <div class="text-sm">
          <select v-model="items">
            <option :value="editOptions.other">
              Armors, Health packs, Powerups
            </option>
            <option :value="editOptions.weapons">Weapons &amp; Ammo</option>
          </select>
        </div>
        <FilterToolbar :on-change="onFiltersChange" />
      </div>

      <div class="flex flex-wrap gap-2">
        <div v-for="item in items" :key="item.filename">
          <div class="bg-gray-300 font-bold text-xs p-2">
            {{ item.name }}
          </div>
          <TextureEditor
            :container-id="slugify(item.filename)"
            :filters="lastFilters"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>

  <SiteFooter />
</template>
