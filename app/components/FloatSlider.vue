<template>
  <div class="float-slider">
    <div class="float-slider__head">
      <span class="float-slider__label">Float Value</span>
      <span class="float-slider__value">{{ modelValue.toFixed(4) }}</span>
    </div>

    <div class="float-slider__track-wrap">
      <div class="float-slider__track-fill" :style="{ width: fillPercent + '%' }"></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="0.0001"
        :value="modelValue"
        @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
        class="float-slider__input"
      />
    </div>

    <div class="float-slider__range">
      <span>{{ min.toFixed(2) }}</span>
      <span>{{ max.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()

const fillPercent = computed(() => {
  if (props.max === props.min) return 0
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})
</script>

<style scoped>
.float-slider {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.float-slider__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.float-slider__label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.float-slider__value {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #60A5FA, #818CF8);
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Track */
.float-slider__track-wrap {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: visible;
}

.float-slider__track-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #3B82F6 0%, #6366F1 50%, #22D3EE 100%);
  box-shadow: 0 0 16px rgba(96, 165, 250, 0.5);
  pointer-events: none;
}

.float-slider__input {
  position: absolute;
  inset: -6px 0;
  width: 100%;
  height: 20px;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.float-slider__input::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #60A5FA;
  box-shadow:
    0 0 0 4px rgba(59, 130, 246, 0.2),
    0 6px 16px rgba(59, 130, 246, 0.5);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.float-slider__input::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow:
    0 0 0 6px rgba(96, 165, 250, 0.25),
    0 8px 22px rgba(96, 165, 250, 0.65);
}

.float-slider__input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #60A5FA;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2), 0 6px 16px rgba(59, 130, 246, 0.5);
  cursor: pointer;
  transition: all 0.2s;
}

.float-slider__input::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 0 0 6px rgba(96, 165, 250, 0.25), 0 8px 22px rgba(96, 165, 250, 0.65);
}

.float-slider__range {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-muted);
}
</style>
