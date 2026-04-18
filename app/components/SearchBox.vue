<template>
  <div class="search-box">
    <svg class="search-box__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Поиск по названию"
      class="search-box__input"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-box {
  position: relative;
}

.search-box__icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-box__input {
  padding: 0.65rem 1rem 0.65rem 2.5rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 0.85rem;
  outline: none;
  width: 220px;
  transition: all 0.25s;
}

.search-box__input::placeholder {
  color: var(--color-text-muted);
}

.search-box__input:focus {
  border-color: rgba(96, 165, 250, 0.4);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
