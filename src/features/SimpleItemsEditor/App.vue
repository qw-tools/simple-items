<script lang="ts" setup>
import SiteHeader from "@/Site/SiteHeader.vue";
import SiteFooter from "@/Site/SiteFooter.vue";
import Settings from "./Settings.vue";
import {
  ammo,
  armors,
  healthPacks,
  powerups,
  runes,
  weapons,
} from "@/features/SimpleItemsEditor/items";
import { ref } from "vue";
import SimpleItems from "./SimpleItems.vue";
import { Item } from "@/features/SimpleItemsEditor/types";
import Selection from "@/features/SimpleItemsEditor/Selection.vue";

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

    <div class="container my-4">
      <div id="AppContainerWidth" />

      <div class="flex justify-between">
        <div>
          <Selection />
          <SimpleItems :items="items" container-id="SimpleItemsApp" />
          <div id="SimpleItemsApp" />
        </div>
        <div
          id="AppSettings"
          class="px-4 bg-gray-200 border border-black/10 w-[240px] shadow-md"
        >
          <Settings />
        </div>
      </div>
    </div>
  </div>

  <SiteFooter />
</template>
