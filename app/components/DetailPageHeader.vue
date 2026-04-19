<template>
  <div class="detail-head">
    <div class="detail-head-left">
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

<style>
.detail-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 1.25rem;
}

.detail-head-left {
  display: flex;
  flex-direction: column;
}

.detail-head-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.detail-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-glow);
  margin-bottom: 0.75rem;
}

.detail-eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60A5FA;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
}

.detail-title {
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}
</style>
