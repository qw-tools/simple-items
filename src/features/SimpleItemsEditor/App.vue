<script lang="ts" setup>
import { ref } from "vue";
import SiteHeader from "@/Site/SiteHeader.vue";
import SiteFooter from "@/Site/SiteFooter.vue";
import ItemSettings from "./ItemSettings.vue";
import {
  ammo,
  armors,
  healthPacks,
  misc,
  powerups,
  runes,
  weapons,
} from "@/features/SimpleItemsEditor/items";
import SimpleItems from "./SimpleItems.vue";
import { Item } from "@/features/SimpleItemsEditor/types";
import ItemSelection from "@/features/SimpleItemsEditor/ItemSelection.vue";
import LoadingIndicator from "@/Site/LoadingIndicator.vue";

import * as EE from "@/features/SimpleItemsEditor/events";
import { dispatch } from "@/features/SimpleItemsEditor/events";
import classNames from "classnames";
import {
  SIDEBAR_MARGIN,
  SIDEBAR_WIDTH,
} from "@/features/SimpleItemsEditor/config";

const items = ref<Item[]>(
  [weapons, ammo, powerups, healthPacks, runes, armors, misc].flat(1)
);

const editorIsReady = ref<boolean>(false);

document.addEventListener(EE.Name.READY, () => {
  editorIsReady.value = true;
  dispatch(EE.Name.SELECT_ALL);
});
</script>
<template>
  <SiteHeader current-app="simple-items" />

  <div class="bg-gray-100 border-b border-gray-300">
    <div class="bg-white shadow">
      <div class="container">
        <h1 class="font-bold text-xl py-4">
          Simple Items Texture Editor
        </h1>
      </div>
    </div>

    <div class="container mt-4 mb-8">
      <div id="AppContainerWidth" />

      <div v-if="!editorIsReady" class="fadeIn">
        <LoadingIndicator class="h-96" />
      </div>

      <div
        :class="classNames({ hidden: !editorIsReady, fadeIn: editorIsReady })"
        class="flex justify-around"
      >
        <div>
          <ItemSelection />
          <SimpleItems :items="items" container-id="SimpleItemsApp" />
        </div>
        <div :style="`width: ${SIDEBAR_WIDTH}px`">
          <div
            :style="`margin-left: ${SIDEBAR_MARGIN}px`"
            class="bg-gray-200 p-4 border border-black/10 shadow-md mt-12"
          >
            <ItemSettings />
          </div>
        </div>
      </div>
    </div>
  </div>

  <SiteFooter />
</template>
