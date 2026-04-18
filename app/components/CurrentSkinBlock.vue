<template>
  <div
    class="current-skin-block glass-card"
    :class="{ 'current-skin-block--clickable': skin }"
    :style="skin ? { '--rarity-color': skin.rarity.color } : {}"
    @click="skin && $emit('click')"
  >
    <div v-if="skin" class="current-skin-content">
      <div class="current-skin-image">
        <img :src="skin.image" :alt="skin.name" />
      </div>
      <div class="current-skin-info">
        <div class="current-skin-name">{{ skin.name }}</div>
        <div class="current-skin-rarity" :style="{ color: skin.rarity.color }">
          {{ skin.rarity.name }}
        </div>
        <div class="current-skin-stats">
          <div v-if="playerSkin?.weapon_wear !== null" class="current-skin-stat">
            <span class="current-skin-stat__label">Float:</span>
            <span class="current-skin-stat__value">{{ playerSkin.weapon_wear?.toFixed(4) }}</span>
          </div>
          <div v-if="playerSkin?.weapon_seed !== null" class="current-skin-stat">
            <span class="current-skin-stat__label">Seed:</span>
            <span class="current-skin-stat__value">{{ playerSkin.weapon_seed }}</span>
          </div>
          <div v-if="playerSkin?.weapon_nametag" class="current-skin-stat">
            <span class="current-skin-stat__label">Name:</span>
            <span class="current-skin-stat__value">{{ playerSkin.weapon_nametag }}</span>
          </div>
          <div v-if="playerSkin?.weapon_stattrak" class="current-skin-stat">
            <span class="current-skin-stat__badge">StatTrak™</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="current-skin-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      </svg>
      <span>Скин не выбран</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skin } from '~/utils/skins'

interface PlayerSkin {
  weapon_wear?: number | null
  weapon_seed?: number | null
  weapon_nametag?: string | null
  weapon_stattrak?: boolean | number
}

defineProps<{
  skin?: Skin | null
  playerSkin?: PlayerSkin | null
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.current-skin-block {
  padding: 2rem;
  border-radius: 18px;
  transition: all 0.3s;
}

.current-skin-block--clickable {
  cursor: pointer;
}

.current-skin-block--clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -8px rgba(59, 130, 246, 0.3);
}

.team-t .current-skin-block--clickable:hover {
  box-shadow: 0 12px 32px -8px rgba(251, 191, 36, 0.3);
}

.current-skin-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.current-skin-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-skin-image img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px var(--rarity-color, rgba(59, 130, 246, 0.4)));
}

.current-skin-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.current-skin-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.current-skin-rarity {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.95;
}

.current-skin-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.current-skin-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.current-skin-stat__label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.current-skin-stat__value {
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.current-skin-stat__badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15));
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #60A5FA;
}

.current-skin-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.current-skin-empty svg {
  width: 32px;
  height: 32px;
  opacity: 0.5;
}
</style>
