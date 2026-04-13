<template>
  <div
    class="rounded-lg overflow-hidden cursor-pointer transition-all relative group h-full flex flex-col"
    :style="{
      backgroundColor: 'var(--color-tactical-elevated)',
      border: `2px solid ${skin.rarity.color}`,
      backdropFilter: 'blur(10px)',
      boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${skin.rarity.color}30`,
    }"
    @click="$emit('select', skin)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="corner-brackets" :style="{ color: skin.rarity.color }"></div>
    <div class="scan-line" v-if="isHovered"></div>

    <div class="aspect-video flex items-center justify-center p-4 relative" style="background-color: var(--color-tactical-surface);">
      <img
        :src="skin.image"
        :alt="skin.name"
        class="max-w-full max-h-full object-contain transition-transform duration-300"
        :class="{ 'scale-110': isHovered }"
        style="filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.6));"
      />
    </div>

    <div class="p-4">
      <div class="font-medium text-white mb-1 tracking-wide" style="font-size: 1.125rem;">{{ skin.name }}</div>
      <div class="flex items-center justify-between text-sm">
        <span
          :style="{ color: skin.rarity.color }"
          class="font-medium tracking-wide"
          style="text-transform: uppercase; letter-spacing: 0.05em; font-size: 1rem;"
        >
          {{ skin.rarity.name }}
        </span>
        <span v-if="skin.stattrak" class="font-medium tracking-wide" style="color: var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.05em; font-size: 1rem;">StatTrak™</span>
      </div>
      <div v-if="skin.min_float != null && skin.max_float != null" class="mt-2 font-mono" style="color: var(--color-tactical-muted); font-size: 0.9rem;">
        Float: {{ skin.min_float.toFixed(2) }} - {{ skin.max_float.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skin } from '~/utils/skins'
import { ref } from 'vue'

defineProps<{
  skin: Skin
}>()

defineEmits<{
  select: [skin: Skin]
}>()

const isHovered = ref(false)
</script>
