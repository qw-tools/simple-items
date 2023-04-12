<script lang="ts" setup>
import SiteHeader from "@/Site/SiteHeader.vue";
import SiteFooter from "@/Site/SiteFooter.vue";
import FilterToolbar from "./SharedSettingsToolbar.vue";
import {
  ammo,
  armors,
  healthPacks,
  Item,
  powerups,
  runes,
  weapons,
} from "@/pkg/quake/items";
import { ref } from "vue";
import SimpleItems from "./SimpleItems.vue";

const items = ref<Item[]>(
  [weapons, ammo, runes, powerups, armors, healthPacks].flat(1)
);
</script>
<template>
  <SiteHeader current-app="simple-items" />

  <div class="bg-gray-100 border-b border-gray-300">
    <div class="bg-white shadow">
      <div class="container">
        <h1 class="font-bold text-xl py-4">
          Simple Items Texture Editor
          <span
            class="rounded-lg bg-yellow-200 font-normal px-2 py-1 ml-4 border text-sm"
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
        <FilterToolbar />
      </div>

      <div class="flex justify-between">
        <div>
          <SimpleItems :items="items" container-id="SimpleItemsApp" />
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
