<template>
  <div class="detail-head">
    <div class="detail-head-left">
      <NuxtLink :to="backUrl" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M11 18l-6-6 6-6"/>
        </svg>
        {{ backText }}
      </NuxtLink>

      <div class="detail-title-wrap">
        <div class="detail-eyebrow">
          <span class="detail-eyebrow__dot"></span>
          {{ eyebrow }}
        </div>
        <h1 class="detail-title gradient-text-primary">{{ title }}</h1>
      </div>
    </div>

    <div class="detail-head-actions">
      <SearchBox v-model="searchModel" />
      <RarityFilterDropdown v-if="showRarityFilter" v-model="rarityModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  eyebrow: string
  backUrl: string
  backText: string
  showRarityFilter?: boolean
  search: string
  rarity: string | null
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:rarity': [value: string | null]
}>()

const searchModel = computed({
  get: () => props.search,
  set: (value) => emit('update:search', value)
})

const rarityModel = computed({
  get: () => props.rarity,
  set: (value) => emit('update:rarity', value)
})
</script>
