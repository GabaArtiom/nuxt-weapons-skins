<template>
  <div class="space-y-2">
    <label
      class="text-sm font-medium tracking-wide"
      style="
        color: var(--color-tactical-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 1rem;
      "
    >
      Float Value:
      <span class="font-mono" style="color: var(--color-accent-primary)">{{
        modelValue.toFixed(4)
      }}</span>
    </label>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="0.0001"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          parseFloat(($event.target as HTMLInputElement).value),
        )
      "
      class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      style="background-color: var(--color-tactical-surface)"
    />
    <div
      class="flex justify-between text-xs font-mono"
      style="color: var(--color-tactical-muted)"
    >
      <span style="font-size: 0.95rem">Min: {{ min.toFixed(2) }}</span>
      <span style="font-size: 0.95rem">Max: {{ max.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number;
  min: number;
  max: number;
}>();

defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--color-accent-primary);
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
  transition: all 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 20px rgba(255, 107, 0, 0.8);
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-accent-primary);
  cursor: pointer;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
  transition: all 0.2s;
}

.slider::-moz-range-thumb:hover {
  box-shadow: 0 0 20px rgba(255, 107, 0, 0.8);
  transform: scale(1.1);
}
</style>
