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

<style scoped>
.detail-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-head-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-head-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: all 0.25s ease;
}

.back-btn svg {
  width: 14px;
  height: 14px;
}

.back-btn:hover {
  color: #fff;
  border-color: rgba(96, 165, 250, 0.4);
  background: rgba(59, 130, 246, 0.12);
  transform: translateX(-2px);
}

.detail-title-wrap {
  margin-top: 1.25rem;
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
