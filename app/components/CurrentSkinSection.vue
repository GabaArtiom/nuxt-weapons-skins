<template>
  <div class="current-skin-section">
    <div class="current-skin-wrapper">
      <TeamToggle v-model="teamModel" />

      <CurrentSkinBlock
        :skin="skin"
        :player-skin="playerSkin"
        @click="$emit('click')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skin, PlayerSkin } from '~/utils/skins'

const props = defineProps<{
  skin: Skin | null
  playerSkin: PlayerSkin | null
  team: 2 | 3
}>()

const emit = defineEmits<{
  'update:team': [value: 2 | 3]
  'click': []
}>()

const teamModel = computed({
  get: () => props.team,
  set: (value) => emit('update:team', value)
})
</script>

<style scoped>
.current-skin-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.current-skin-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
