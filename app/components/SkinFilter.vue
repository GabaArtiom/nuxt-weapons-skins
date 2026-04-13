<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        v-model="searchQuery"
        placeholder="Поиск по названию..."
        class="w-full px-4 py-3 pl-10 rounded-lg text-white font-medium tracking-wide"
        style="background-color: var(--color-tactical-surface); border: 1px solid var(--color-tactical-border); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;"
      />
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--color-tactical-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button
        v-for="rarity in rarities"
        :key="rarity.name"
        @click="selectedRarity = selectedRarity === rarity.name ? null : rarity.name"
        class="px-3 py-2 rounded-lg font-medium tracking-wide transition-all text-sm"
        :style="{
          backgroundColor: selectedRarity === rarity.name ? rarity.color : 'var(--color-tactical-surface)',
          border: `1px solid ${selectedRarity === rarity.name ? rarity.color : 'var(--color-tactical-border)'}`,
          color: selectedRarity === rarity.name ? '#ffffff' : rarity.color,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
        }"
      >
        {{ rarity.name }}
      </button>
    </div>

    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        v-model="showStatTrak"
        id="stattrak-filter"
        class="w-4 h-4 rounded"
        style="background-color: var(--color-tactical-surface);"
      />
      <label for="stattrak-filter" class="text-sm font-medium tracking-wide cursor-pointer" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem;">
        Только StatTrak™
      </label>
    </div>
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
