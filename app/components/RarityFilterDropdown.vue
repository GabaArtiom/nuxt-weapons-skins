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
