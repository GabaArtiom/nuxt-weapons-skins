<template>
  <NuxtLink :to="backUrl" class="back-btn" :class="{ 'is-scrolled': isScrolled }">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5M11 18l-6-6 6-6"/>
    </svg>
    <span class="back-btn__text">{{ backText }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  backUrl: string
  backText: string
}>()

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
  gap: 0 !important;
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
  transform: translateX(-50px) translateY(-3px);
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.back-btn.is-scrolled:hover svg {
  transform: none;
}
</style>
