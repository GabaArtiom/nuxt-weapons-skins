<template>
  <div class="filter-dropdown">
    <button @click="showMenu = !showMenu" class="filter-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 4h18M3 12h18M3 20h18"/>
      </svg>
      <span>{{ modelValue || 'Все редкости' }}</span>
    </button>
    <Transition name="dropdown">
      <div v-if="showMenu" class="filter-dropdown__menu">
        <button @click="selectRarity(null)" class="filter-dropdown__item" :class="{ 'filter-dropdown__item--active': !modelValue }">
          Все редкости
        </button>
        <button
          v-for="rarity in rarities"
          :key="rarity.name"
          @click="selectRarity(rarity.name)"
          class="filter-dropdown__item"
          :class="{ 'filter-dropdown__item--active': modelValue === rarity.name }"
          :style="{ '--rarity-color': rarity.color }"
        >
          <span class="filter-dropdown__dot"></span>
          {{ rarity.name }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const showMenu = ref(false)

const rarities = [
  { name: 'Consumer Grade', color: '#b0c3d9' },
  { name: 'Industrial Grade', color: '#5e98d9' },
  { name: 'Mil-Spec Grade', color: '#4b69ff' },
  { name: 'Restricted', color: '#8847ff' },
  { name: 'Classified', color: '#d32ce6' },
  { name: 'Covert', color: '#eb4b4b' },
  { name: 'Contraband', color: '#e4ae39' },
]

const selectRarity = (name: string | null) => {
  emit('update:modelValue', name)
  showMenu.value = false
}
</script>

<style scoped>
.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s;
}

.filter-btn svg {
  width: 16px;
  height: 16px;
}

.filter-btn:hover {
  border-color: rgba(96, 165, 250, 0.3);
  color: #fff;
}

.filter-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: rgba(10, 15, 31, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0.5rem;
  z-index: 50;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.filter-dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.85rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  background: none;
  border: none;
}

.filter-dropdown__item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.filter-dropdown__item--active {
  color: #fff;
  background: rgba(59, 130, 246, 0.1);
}

.filter-dropdown__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--rarity-color, #fff);
  box-shadow: 0 0 6px var(--rarity-color, transparent);
  flex-shrink: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
</style>
