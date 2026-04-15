<template>
  <div
    class="skin-card"
    :style="{
      '--rarity-color': skin.rarity.color,
    }"
    @click="$emit('select', skin)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="skin-card__shine scan-line" v-if="isHovered"></div>

    <div class="skin-card__img">
      <img
        :src="skin.image"
        :alt="skin.name"
        class="skin-card__img-el"
        :class="{ 'is-hovered': isHovered }"
        loading="lazy"
      />
      <div class="skin-card__img-glow"></div>
    </div>

    <div class="skin-card__body">
      <div class="skin-card__name">{{ skin.name }}</div>
      <div class="skin-card__meta">
        <span class="skin-card__rarity">{{ skin.rarity.name }}</span>
        <span v-if="skin.stattrak" class="skin-card__stattrak">StatTrak™</span>
      </div>
      <div
        v-if="skin.min_float != null && skin.max_float != null"
        class="skin-card__float"
      >
        Float {{ skin.min_float.toFixed(2) }} — {{ skin.max_float.toFixed(2) }}
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

<style scoped>
.skin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.7) 100%);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45),
    0 0 0 1px color-mix(in srgb, var(--rarity-color) 18%, transparent) inset;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.3s;
  isolation: isolate;
}

.skin-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--rarity-color) 55%, transparent), rgba(96, 165, 250, 0.25) 45%, transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.35s;
}

.skin-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 22px 50px -12px color-mix(in srgb, var(--rarity-color) 35%, rgba(0, 0, 0, 0.6)),
    0 0 0 1px color-mix(in srgb, var(--rarity-color) 45%, transparent) inset;
  border-color: color-mix(in srgb, var(--rarity-color) 40%, transparent);
}

.skin-card:hover::after {
  opacity: 1;
}

.skin-card__shine {
  color: var(--rarity-color);
}

/* image */
.skin-card__img {
  position: relative;
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem;
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, var(--rarity-color) 18%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.45), rgba(10, 15, 31, 0.6));
  overflow: hidden;
}

.skin-card__img-el {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}

.skin-card__img-el.is-hovered {
  transform: scale(1.1) translateY(-3px);
}

.skin-card__img-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--rarity-color) 22%, transparent), transparent 60%);
  filter: blur(30px);
  opacity: 0.6;
  transition: opacity 0.4s;
  pointer-events: none;
}

.skin-card:hover .skin-card__img-glow {
  opacity: 1;
}

/* body */
.skin-card__body {
  padding: 1rem 1.15rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.skin-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.01em;
  line-height: 1.3;
}

.skin-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.skin-card__rarity {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rarity-color);
  text-shadow: 0 0 12px color-mix(in srgb, var(--rarity-color) 60%, transparent);
}

.skin-card__stattrak {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  color: #fff;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
}

.skin-card__float {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}
</style>
