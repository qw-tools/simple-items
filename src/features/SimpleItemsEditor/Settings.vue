<script lang="ts" setup>
import { SETTINGS } from "@/features/SimpleItemsEditor/pixi/config";
import * as handlers from "./eventHandlers";
</script>
<template>
  <div class="divide-y divide-black/20">
    <div class="flex items-center space-x-2 py-3">
      <label class="text-sm font-bold">
        <input
          :checked="SETTINGS.outline.enabled"
          type="checkbox"
          @change="handlers.onOutlineEnabledChange"
        />
        Outline
      </label>

      <label class="text-xs">
        <input type="color" @input="handlers.onOutlineColorChange" />
      </label>

      <input
        class="w-10 text-sm"
        max="16"
        min="1"
        step="1"
        type="number"
        @input="handlers.onOutlineWidthChange"
      />
      <span class="text-gray-600 text-xs">px</span>
    </div>

    <div class="py-3 space-y-1">
      <div class="text-sm font-bold">Primary graphic</div>

      <div class="flex items-center space-x-2">
        <input type="color" @input="handlers.onBackgroundColorChange" />
        <div class="text-sm">
          <select id="" name="">
            <option value="">RL</option>
            <option value="">GL</option>
            <option value="">HEALTH</option>
          </select>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm">Scale</div>
        <input
          class="w-20"
          max="1"
          min="0.1"
          step="0.05"
          type="range"
          @input="handlers.onScaleChange"
        />
      </div>
    </div>

    <div class="py-3 space-y-1.5">
      <label class="text-sm font-bold">
        <input type="checkbox" /> Secondary graphic
      </label>

      <div>
        <div class="text-sm w-20">Shape</div>

        <div class="flex flex-cols items-center cursor-pointer">
          <img class="w-7 h-7" src="/assets/img/icons/circle.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/triangle.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/square.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/rhombus.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/pentagon.png" />
          <img class="w-7 h-7 grayscale" src="/assets/img/icons/hexagon.png" />
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Scale</div>
        <input class="w-20" max="1" min="0.1" step="0.05" type="range" />
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Angle</div>
        <input class="w-20" max="180" min="-180" step="1" type="range" />
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Outer width</div>
        <input class="w-20" max="1" min="0.1" step="0.1" type="range" />
      </div>

      <div class="flex items-center space-x-2">
        <div class="text-sm w-20">Inner width</div>
        <input class="w-20" max="1" min="0.1" step="0.1" type="range" />
      </div>
    </div>

    <div class="pt-6">
      <button class="text-sm px-3 py-1.5">reset to default</button>
    </div>
  </div>
</template>
