<template>
  <div class="skin-filter">
    <div class="skin-filter__search">
      <svg class="skin-filter__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        v-model="searchQuery"
        placeholder="Поиск по названию"
        class="skin-filter__input"
      />
    </div>

    <div class="skin-filter__rarities">
      <button
        v-for="rarity in rarities"
        :key="rarity.name"
        @click="selectedRarity = selectedRarity === rarity.name ? null : rarity.name"
        class="rarity-pill"
        :class="{ 'is-active': selectedRarity === rarity.name }"
        :style="{ '--rarity-color': rarity.color }"
      >
        <span class="rarity-pill__dot"></span>
        {{ rarity.name }}
      </button>
    </div>

    <label class="stattrak-toggle">
      <input type="checkbox" v-model="showStatTrak" class="stattrak-toggle__input" />
      <span class="stattrak-toggle__box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span class="stattrak-toggle__label">Только StatTrak™</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const searchQuery = defineModel<string>('search', { default: '' })
const selectedRarity = defineModel<string | null>('rarity', { default: null })
const showStatTrak = defineModel<boolean>('stattrak', { default: false })

const rarities = [
  { name: 'Consumer Grade', color: '#b0c3d9' },
  { name: 'Industrial Grade', color: '#5e98d9' },
  { name: 'Mil-Spec Grade', color: '#4b69ff' },
  { name: 'Restricted', color: '#8847ff' },
  { name: 'Classified', color: '#d32ce6' },
  { name: 'Covert', color: '#eb4b4b' },
  { name: 'Contraband', color: '#e4ae39' },
]
</script>

<style scoped>
.skin-filter {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Search */
.skin-filter__search {
  position: relative;
}

.skin-filter__search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
  transition: color 0.25s;
}

.skin-filter__input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  outline: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.skin-filter__input::placeholder {
  color: var(--color-text-muted);
}

.skin-filter__input:focus {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 8px 24px rgba(59, 130, 246, 0.2);
}

.skin-filter__search:focus-within .skin-filter__search-icon {
  color: var(--color-accent-glow);
}

/* Rarity pills */
.skin-filter__rarities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rarity-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rarity-color);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid color-mix(in srgb, var(--rarity-color) 25%, transparent);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
}

.rarity-pill__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--rarity-color);
  box-shadow: 0 0 8px var(--rarity-color);
}

.rarity-pill:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--rarity-color) 55%, transparent);
  box-shadow: 0 6px 18px color-mix(in srgb, var(--rarity-color) 20%, transparent);
}

.rarity-pill.is-active {
  color: #fff;
  background: linear-gradient(135deg, color-mix(in srgb, var(--rarity-color) 35%, transparent), color-mix(in srgb, var(--rarity-color) 18%, transparent));
  border-color: color-mix(in srgb, var(--rarity-color) 70%, transparent);
  box-shadow:
    0 8px 24px color-mix(in srgb, var(--rarity-color) 35%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* StatTrak toggle */
.stattrak-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  width: fit-content;
  user-select: none;
}

.stattrak-toggle__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.stattrak-toggle__box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.stattrak-toggle__box svg {
  width: 14px;
  height: 14px;
  transform: scale(0);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stattrak-toggle__input:checked + .stattrak-toggle__box {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border-color: rgba(96, 165, 250, 0.7);
  color: #fff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.stattrak-toggle__input:checked + .stattrak-toggle__box svg {
  transform: scale(1);
}

.stattrak-toggle__label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition: color 0.25s;
}

.stattrak-toggle:hover .stattrak-toggle__label {
  color: #fff;
}
</style>
