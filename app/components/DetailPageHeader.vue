<template>
  <div>
    <NuxtLink :to="backUrl" class="back-btn" :class="{ 'is-scrolled': isScrolled }">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M11 18l-6-6 6-6"/>
      </svg>
      <span class="back-btn__text">{{ backText }}</span>
    </NuxtLink>

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

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
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

.back-btn {
  position: sticky;
  top: 6rem;
  z-index: 50;
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
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.back-btn.is-scrolled {
  transform: translateX(-50px);
  padding: 0.65rem 0.75rem;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(96, 165, 250, 0.2) inset;
}

.back-btn.is-scrolled .back-btn__text {
  opacity: 0;
  width: 0;
  margin-left: 0;
}

.back-btn__text {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.back-btn svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.back-btn:hover {
  color: #fff;
  border-color: rgba(96, 165, 250, 0.4);
  background: rgba(59, 130, 246, 0.12);
}

.back-btn:hover svg {
  transform: translateX(-2px);
}

.back-btn.is-scrolled:hover {
  transform: translateX(-45px);
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(96, 165, 250, 0.5);
}

.detail-title-wrap {
  /* margin-top removed since it's now on .detail-head */
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
