<script lang="ts" setup>
import {
  getDefaultSharedSettings,
  SharedSettings,
} from "./pixi/SharedSettings";
import { SharedSettingsChange } from "./pixi/events";
import SiteHeader from "@/Site/SiteHeader.vue";
import SiteFooter from "@/Site/SiteFooter.vue";
import FilterToolbar from "./SharedSettingsToolbar.vue";
import {
  ammo,
  armors,
  healthPacks,
  Item,
  powerups,
  weapons,
} from "@/pkg/quake/items";
import { ref } from "vue";
import SimpleItems from "./SimpleItems.vue";

const items = ref<Item[]>(
  [weapons, ammo, powerups, armors, healthPacks].flat(1)
);

let lastSettings: SharedSettings = getDefaultSharedSettings();

function onFiltersChange(settings: SharedSettings): void {
  document.dispatchEvent(new SharedSettingsChange(settings));
  lastSettings = settings;
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

    <div class="container my-4 space-y-4">
      <div id="AppContainerWidth" />
      <div
        class="my-4 px-4 py-3 rounded border shadow bg-white grid gap-2 sm:gap-8 sm:grid-flow-col sm:auto-cols-max"
      >
        <FilterToolbar :on-change="onFiltersChange" />
      </div>

      <div class="flex justify-between">
        <div class="">
          <SimpleItems
            :items="items"
            :settings="lastSettings"
            container-id="SimpleItemsApp"
          />
          <div id="SimpleItemsApp" />
        </div>
        <div id="AppSettings" class="p-2 bg-gray-200">
          <div
            v-for="item in items"
            :key="item.filename"
            class="flex space-x-2 items-center"
          >
            <div class="text-sm w-32">{{ item.name }}</div>
            <div>
              <input id="" :value="item.backgroundColor" name="" type="color" />
            </div>
            <div>
              <select id="" class="text-sm" name="">
                <option value="">inner</option>
              </select>
            </div>
            <div>
              <select id="" class="text-sm" name="">
                <option value="">outer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <SiteFooter />
</template>
