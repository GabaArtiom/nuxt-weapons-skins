<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal" v-if="skin" :style="{ '--rarity-color': skin.rarity.color }">
          <button class="modal__close" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

        <div class="modal__head">
          <div class="modal__rarity">
            <span class="modal__rarity-dot"></span>
            {{ skin.rarity.name }}
          </div>
          <h2 class="modal__title">{{ skin.name }}</h2>
        </div>

        <div class="modal__preview" @click="showFullscreen = true">
          <div class="modal__preview-glow"></div>
          <img :src="skin.image" :alt="skin.name" class="modal__preview-img" />
          <div class="corner-brackets modal__preview-brackets"></div>
          <div class="modal__preview-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            <span>Нажми для увеличения</span>
          </div>
        </div>

        <div class="modal__body">
          <FloatSlider
            v-model="floatModel"
            :min="skin.min_float"
            :max="skin.max_float"
          />

          <div class="input-group">
            <div class="input-group__head">
              <span class="input-group__label">Seed (Pattern)</span>
              <span class="input-group__value">{{ seedModel }}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              v-model.number="seedModel"
              class="seed-slider"
            />
          </div>

          <div v-if="showNametag" class="input-group">
            <span class="input-group__label">Nametag</span>
            <input
              v-model="nametagModel"
              placeholder="Введите название"
              class="text-input"
            />
          </div>

          <label v-if="showStatTrak" class="stattrak-toggle">
            <input type="checkbox" v-model="statTrakModel" class="stattrak-toggle__input" />
            <span class="stattrak-toggle__box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <span class="stattrak-toggle__label">Включить StatTrak™</span>
          </label>

          <div class="modal__actions" v-if="!isUpdating">
            <button
              @click="$emit('save', 3)"
              :disabled="saving"
              class="team-btn team-btn--ct"
            >
              <span class="team-btn__badge">CT</span>
              <span>{{ saving === 3 ? 'Сохранение…' : 'Сохранить для CT' }}</span>
            </button>
            <button
              @click="$emit('save', 2)"
              :disabled="saving"
              class="team-btn team-btn--t"
            >
              <span class="team-btn__badge">T</span>
              <span>{{ saving === 2 ? 'Сохранение…' : 'Сохранить для T' }}</span>
            </button>
          </div>

          <div class="modal__actions modal__actions--single" v-else>
            <button
              @click="$emit('save', currentTeam)"
              :disabled="saving"
              class="team-btn team-btn--update"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
              </svg>
              <span>{{ saving ? 'Обновление…' : 'Обновить скин' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Fullscreen Image Viewer -->
  <Transition name="fullscreen">
    <div v-if="showFullscreen" class="fullscreen-backdrop" @click="showFullscreen = false">
      <button class="fullscreen__close" @click="showFullscreen = false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <img :src="skin?.image" :alt="skin?.name" class="fullscreen__img" @click.stop />
    </div>
  </Transition>
</Teleport>
</template>

<script setup lang="ts">
import type { Skin } from '~/utils/skins'

const props = withDefaults(defineProps<{
  show: boolean
  skin: Skin | null
  floatValue: number
  seedValue: number
  nametag: string
  statTrak: boolean
  showStatTrak?: boolean
  showNametag?: boolean
  isUpdating?: boolean
  currentTeam?: 2 | 3
  saving?: number | false
}>(), {
  showStatTrak: true,
  showNametag: true,
  isUpdating: false,
  currentTeam: 3,
  saving: false
})

const emit = defineEmits<{
  'close': []
  'save': [team: number]
  'update:floatValue': [value: number]
  'update:seedValue': [value: number]
  'update:nametag': [value: string]
  'update:statTrak': [value: boolean]
}>()

const floatModel = computed({
  get: () => props.floatValue,
  set: (value) => emit('update:floatValue', value)
})

const seedModel = computed({
  get: () => props.seedValue,
  set: (value) => emit('update:seedValue', value)
})

const nametagModel = computed({
  get: () => props.nametag,
  set: (value) => emit('update:nametag', value)
})

const statTrakModel = computed({
  get: () => props.statTrak,
  set: (value) => emit('update:statTrak', value)
})

const showFullscreen = ref(false)
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(5, 8, 17, 0.7);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; overflow-y: auto;
}

.modal {
  position: relative; width: 100%; max-width: 580px;
  max-height: calc(100vh - 3rem); overflow-y: auto;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(96, 165, 250, 0.2);
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8),
    0 0 100px -20px color-mix(in srgb, var(--rarity-color) 30%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.modal::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--rarity-color) 60%, transparent), rgba(96, 165, 250, 0.3), transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.modal__close {
  position: absolute; top: 1rem; right: 1rem;
  width: 38px; height: 38px; border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary); cursor: pointer;
  transition: all 0.25s ease; z-index: 3;
}

.modal__close svg { width: 16px; height: 16px; }

.modal__close:hover {
  color: #fff; background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
}

.modal__head { padding: 1.75rem 2rem 0.75rem; }

.modal__rarity {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--rarity-color);
  text-shadow: 0 0 12px color-mix(in srgb, var(--rarity-color) 60%, transparent);
  margin-bottom: 0.6rem;
}

.modal__rarity-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--rarity-color); box-shadow: 0 0 10px var(--rarity-color);
}

.modal__title {
  font-size: 1.75rem; font-weight: 700; color: #fff;
  letter-spacing: -0.01em; line-height: 1.2; margin: 0;
}

.modal__preview {
  position: relative; margin: 1.25rem 2rem; padding: 2rem 1.5rem;
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, var(--rarity-color) 25%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(10, 15, 31, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 180px; overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal__preview:hover {
  border-color: rgba(96, 165, 250, 0.3);
  background: radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, var(--rarity-color) 30%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(10, 15, 31, 0.6));
}

.modal__preview:hover .modal__preview-hint {
  opacity: 1;
}

.modal__preview-glow {
  position: absolute; inset: -20%;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--rarity-color) 30%, transparent), transparent 60%);
  filter: blur(40px); pointer-events: none;
}

.modal__preview-img {
  max-width: 100%; max-height: 180px; object-fit: contain;
  position: relative; z-index: 1;
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.7));
}

.modal__preview-brackets { color: var(--rarity-color); }

.modal__preview-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(96, 165, 250, 0.3);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 2;
}

.modal__preview-hint svg {
  width: 14px;
  height: 14px;
  color: #60A5FA;
}

.fullscreen-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.fullscreen__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 3;
}

.fullscreen__close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}

.fullscreen__close svg {
  width: 20px;
  height: 20px;
}

.fullscreen__img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8));
}

.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: opacity 0.3s ease;
}

.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}

.fullscreen-enter-active .fullscreen__img,
.fullscreen-leave-active .fullscreen__img {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fullscreen-enter-from .fullscreen__img,
.fullscreen-leave-to .fullscreen__img {
  transform: scale(0.9);
  opacity: 0;
}

.modal__body {
  padding: 1.25rem 2rem 2rem;
  display: flex; flex-direction: column; gap: 1.5rem;
}

.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.input-group__head { display: flex; justify-content: space-between; align-items: baseline; }
.input-group__label {
  font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--color-text-secondary);
}
.input-group__value {
  font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600;
  background: linear-gradient(135deg, #60A5FA, #818CF8);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-input {
  width: 100%; padding: 0.85rem 1rem; border-radius: 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fff; font-size: 0.9rem; font-weight: 500;
  outline: none; transition: all 0.25s;
}
.text-input::placeholder { color: var(--color-text-muted); }
.text-input:focus {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.seed-slider {
  width: 100%; height: 8px; border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  appearance: none; cursor: pointer; outline: none;
}
.seed-slider::-webkit-slider-thumb {
  appearance: none; width: 18px; height: 18px; border-radius: 50%;
  background: #fff; border: 2px solid #60A5FA;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.4);
  cursor: pointer; transition: all 0.2s;
}
.seed-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.seed-slider::-moz-range-thumb {
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; border: 2px solid #60A5FA;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.4);
  cursor: pointer;
}

.stattrak-toggle {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.85rem 1rem; border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer; transition: all 0.25s;
}
.stattrak-toggle:hover { border-color: rgba(96, 165, 250, 0.3); }
.stattrak-toggle__input { display: none; }
.stattrak-toggle__box {
  width: 22px; height: 22px; border-radius: 6px;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}
.stattrak-toggle__box svg {
  width: 14px; height: 14px; opacity: 0;
  transition: opacity 0.2s;
}
.stattrak-toggle__input:checked + .stattrak-toggle__box {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border-color: #60A5FA;
}
.stattrak-toggle__input:checked + .stattrak-toggle__box svg { opacity: 1; }
.stattrak-toggle__label {
  font-size: 0.85rem; font-weight: 600;
  color: var(--color-text-secondary);
}
.stattrak-toggle__input:checked ~ .stattrak-toggle__label { color: #fff; }

.modal__actions {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0.75rem; margin-top: 0.5rem;
}

.modal__actions--single {
  grid-template-columns: 1fr;
}

.team-btn {
  position: relative; display: inline-flex;
  align-items: center; justify-content: center; gap: 0.65rem;
  padding: 0.95rem 1rem; border-radius: 14px;
  font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em;
  color: #fff; cursor: pointer; overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.team-btn__badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
}

.team-btn--update {
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.team-btn--update svg {
  width: 18px;
  height: 18px;
}

.team-btn--update:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(96, 165, 250, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.team-btn--t {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.team-btn--t:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.team-btn--ct {
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.team-btn--ct:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.3s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal, .modal-leave-active .modal {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from .modal, .modal-leave-to .modal {
  transform: scale(0.92) translateY(20px); opacity: 0;
}
</style>
