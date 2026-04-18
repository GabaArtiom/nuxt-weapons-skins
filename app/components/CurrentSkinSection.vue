<template>
  <div class="current-skin-section">
    <div class="current-skin-wrapper" :class="{ 'current-skin-wrapper--t': team === 2 }">
      <div class="current-skin-wrapper__bg-icon">
        <IconCT v-if="team === 3" class="bg-icon" />
        <IconT v-if="team === 2" class="bg-icon" />
      </div>

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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.current-skin-wrapper__bg-icon {
  position: absolute;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
  width: 280px;
  height: 280px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.current-skin-wrapper--t .current-skin-wrapper__bg-icon {
  opacity: 0.04;
}

.bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.current-skin-wrapper > :not(.current-skin-wrapper__bg-icon) {
  position: relative;
  z-index: 1;
}
</style>
