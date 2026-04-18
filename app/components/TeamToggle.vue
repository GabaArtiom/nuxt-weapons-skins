<template>
  <button @click="toggle" class="team-toggle">
    <div class="team-toggle__track">
      <div class="team-toggle__slider" :class="{ 'team-toggle__slider--t': modelValue === 2 }"></div>
      <div class="team-toggle__option team-toggle__option--ct" :class="{ 'team-toggle__option--active': modelValue === 3 }">
        <span class="team-toggle__badge team-toggle__badge--ct">
          <IconCT />
        </span>
      </div>
      <div class="team-toggle__option team-toggle__option--t" :class="{ 'team-toggle__option--active': modelValue === 2 }">
        <span class="team-toggle__badge team-toggle__badge--t">
          <IconT />
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 2 | 3 // 2 = T, 3 = CT
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 2 | 3]
}>()

const toggle = () => {
  emit('update:modelValue', props.modelValue === 2 ? 3 : 2)
}
</script>
