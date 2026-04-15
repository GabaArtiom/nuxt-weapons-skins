<template>
  <div class="min-h-screen tactical-grid-bg">
    <PageLoader />

    <header class="detail-nav">
      <div class="detail-nav__inner">
        <NuxtLink to="/" class="brand">
          <div class="brand__mark">
            <div class="brand__mark-inner">CS</div>
            <div class="brand__mark-glow"></div>
          </div>
          <div class="brand__text">
            <span class="brand__title gradient-text-accent">WeaponPaints</span>
            <span class="brand__sub">Premium Skin Arsenal</span>
          </div>
        </NuxtLink>
        <ClientOnly>
          <SteamLoginBtn />
        </ClientOnly>
      </div>
    </header>

    <main class="detail-main">
      <div class="detail-head">
        <NuxtLink to="/?tab=knives" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          Назад к ножам
        </NuxtLink>

        <div class="detail-title-wrap">
          <div class="detail-eyebrow">
            <span class="detail-eyebrow__dot"></span>
            Knife Skin Selection
          </div>
          <h1 class="detail-title gradient-text-primary">{{ knifeName }}</h1>
          <p class="detail-sub">Выберите скин для этого ножа. Настрой float, seed и StatTrak.</p>
        </div>
      </div>

      <div class="detail-filter glass">
        <SkinFilter
          v-model:search="searchQuery"
          v-model:rarity="selectedRarity"
          v-model:stattrak="showStatTrak"
        />
      </div>

      <ClientOnly>
        <div v-if="loading" class="loading-wrap">
          <div class="loading-dots">
            <span></span><span></span><span></span>
          </div>
          <div class="loading-text">Загрузка скинов</div>
        </div>

        <div v-else-if="filteredSkins.length === 0" class="empty-state glass">
          <div class="empty-state__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <div class="empty-state__title">Скины не найдены</div>
          <div class="empty-state__sub">Попробуй изменить фильтры</div>
        </div>

        <div v-else class="skins-grid">
          <div
            v-for="(skin, index) in filteredSkins"
            :key="skin.id"
            class="stagger-item"
            :style="{ animationDelay: `${Math.min(index * 0.03, 0.6)}s` }"
          >
            <SkinCard :skin="skin" @select="openSkinModal" />
          </div>
        </div>

        <Transition name="modal">
          <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
            <div class="modal" v-if="selectedSkin" :style="{ '--rarity-color': selectedSkin.rarity.color }">
              <button class="modal__close" @click="showModal = false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div class="modal__head">
                <div class="modal__rarity">
                  <span class="modal__rarity-dot"></span>
                  {{ selectedSkin.rarity.name }}
                </div>
                <h2 class="modal__title">{{ selectedSkin.name }}</h2>
              </div>

              <div class="modal__preview">
                <div class="modal__preview-glow"></div>
                <img :src="selectedSkin.image" :alt="selectedSkin.name" class="modal__preview-img" />
                <div class="corner-brackets modal__preview-brackets"></div>
              </div>

              <div class="modal__body">
                <FloatSlider
                  v-model="floatValue"
                  :min="selectedSkin.min_float"
                  :max="selectedSkin.max_float"
                />

                <div class="input-group">
                  <div class="input-group__head">
                    <span class="input-group__label">Seed (Pattern)</span>
                    <span class="input-group__value">{{ seedValue }}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    v-model.number="seedValue"
                    class="seed-slider"
                  />
                </div>

                <div class="input-group">
                  <span class="input-group__label">Nametag</span>
                  <input
                    v-model="nametag"
                    placeholder="Введите название скина"
                    class="text-input"
                  />
                </div>

                <label class="stattrak-toggle">
                  <input type="checkbox" v-model="statTrak" class="stattrak-toggle__input" />
                  <span class="stattrak-toggle__box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span class="stattrak-toggle__label">Включить StatTrak™</span>
                </label>

                <div class="modal__actions">
                  <button
                    @click="saveSkinConfig(2)"
                    :disabled="!!saving"
                    class="team-btn team-btn--t"
                  >
                    <span class="team-btn__badge">T</span>
                    <span>{{ saving === 2 ? 'Сохранение…' : 'Сохранить для T' }}</span>
                  </button>
                  <button
                    @click="saveSkinConfig(3)"
                    :disabled="!!saving"
                    class="team-btn team-btn--ct"
                  >
                    <span class="team-btn__badge">CT</span>
                    <span>{{ saving === 3 ? 'Сохранение…' : 'Сохранить для CT' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Skin } from '~/utils/skins'

const route = useRoute()
const knifeId = computed(() => parseInt(route.params.id as string))

const { skins, loading, fetchSkins } = useSkinsData()
const { saveSkin } = usePlayerSkins()

const searchQuery = ref('')
const selectedRarity = ref<string | null>(null)
const showStatTrak = ref(false)

const showModal = ref(false)
const selectedSkin = ref<Skin | null>(null)
const floatValue = ref(0.01)
const seedValue = ref(0)
const nametag = ref('')
const statTrak = ref(false)
const saving = ref<number | false>(false)

onMounted(async () => {
  await fetchSkins()
})

const knifeSkins = computed(() => {
  return skins.value.filter(skin =>
    skin.weapon?.weapon_id === knifeId.value &&
    skin.category?.id === 'sfui_invpanel_filter_melee'
  )
})

const knifeName = computed(() => {
  const firstSkin = knifeSkins.value[0]
  return firstSkin?.weapon?.name || 'Нож'
})

const rarityOrder: Record<string, number> = {
  'Consumer Grade': 1,
  'Industrial Grade': 2,
  'Mil-Spec Grade': 3,
  'Restricted': 4,
  'Classified': 5,
  'Covert': 6,
  'Contraband': 7,
}

const filteredSkins = computed(() => {
  let result = knifeSkins.value

  if (searchQuery.value) {
    result = result.filter(skin =>
      skin.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedRarity.value) {
    result = result.filter(skin => skin.rarity.name === selectedRarity.value)
  }

  if (showStatTrak.value) {
    result = result.filter(skin => skin.stattrak)
  }

  result = [...result].sort((a, b) => {
    const orderA = rarityOrder[a.rarity.name] || 0
    const orderB = rarityOrder[b.rarity.name] || 0
    return orderB - orderA
  })

  return result
})

const openSkinModal = (skin: Skin) => {
  selectedSkin.value = skin
  floatValue.value = skin.min_float
  seedValue.value = 0
  nametag.value = ''
  statTrak.value = false
  showModal.value = true
}

const saveSkinConfig = async (team: number) => {
  if (!selectedSkin.value) return

  saving.value = team
  try {
    await saveSkin({
      weapon_defindex: knifeId.value,
      weapon_paint_id: parseInt(selectedSkin.value.paint_index),
      weapon_wear: floatValue.value,
      weapon_seed: seedValue.value,
      weapon_nametag: nametag.value || null,
      weapon_stattrak: statTrak.value,
      weapon_team: team,
    })
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.detail-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(10, 15, 31, 0.65);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), transparent);
}

.detail-nav__inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.brand { display: flex; align-items: center; gap: 0.85rem; text-decoration: none; }
.brand__mark {
  position: relative;
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  overflow: hidden;
}
.brand__mark-inner {
  font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem;
  color: #fff; letter-spacing: 0.05em; position: relative; z-index: 1;
}
.brand__mark-glow {
  position: absolute; inset: -50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 60%);
  animation: orb-drift 5s ease-in-out infinite;
}
.brand__text { display: flex; flex-direction: column; line-height: 1.1; }
.brand__title { font-size: 1.35rem; font-weight: 700; letter-spacing: 0.02em; }
.brand__sub {
  font-size: 0.65rem; font-weight: 500; color: var(--color-text-muted);
  text-transform: uppercase; letter-spacing: 0.15em; margin-top: 2px;
}

.detail-main { max-width: 1600px; margin: 0 auto; padding: 3rem 1.5rem 6rem; position: relative; z-index: 1; }
.detail-head { margin-bottom: 2.5rem; }
.detail-title-wrap { margin-top: 1.25rem; }

.back-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 0.9rem; border-radius: 10px;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none; transition: all 0.25s ease;
}
.back-btn svg { width: 14px; height: 14px; }
.back-btn:hover {
  color: #fff; border-color: rgba(96, 165, 250, 0.4);
  background: rgba(59, 130, 246, 0.12); transform: translateX(-2px);
}

.detail-eyebrow {
  display: inline-flex; align-items: center; gap: 0.6rem;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--color-accent-glow); margin-bottom: 0.75rem;
}
.detail-eyebrow__dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #60A5FA; box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
}
.detail-title {
  font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.75rem;
}
.detail-sub { font-size: 1rem; color: var(--color-text-secondary); margin: 0; max-width: 540px; }

.detail-filter { padding: 1.5rem; border-radius: 18px; margin-bottom: 2.5rem; }

.skins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.loading-wrap { text-align: center; padding: 5rem 0; }
.loading-dots { display: inline-flex; gap: 0.6rem; margin-bottom: 1.25rem; }
.loading-dots span {
  width: 10px; height: 10px; border-radius: 50%;
  background: #60A5FA; animation: loading-bounce 1.2s ease-in-out infinite;
  box-shadow: 0 0 14px rgba(96, 165, 250, 0.8);
}
.loading-dots span:nth-child(2) { animation-delay: 0.15s; }
.loading-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes loading-bounce {
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
.loading-text {
  font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--color-text-muted);
}

.empty-state {
  max-width: 420px; margin: 3rem auto; padding: 2.5rem 2rem;
  border-radius: 18px; text-align: center;
}
.empty-state__icon {
  display: inline-flex; width: 56px; height: 56px; border-radius: 14px;
  align-items: center; justify-content: center;
  color: var(--color-accent-glow);
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.25);
  margin-bottom: 1rem;
}
.empty-state__icon svg { width: 28px; height: 28px; }
.empty-state__title { font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 0.3rem; }
.empty-state__sub { font-size: 0.85rem; color: var(--color-text-muted); }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(5, 8, 17, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; overflow-y: auto;
}
.modal {
  position: relative; width: 100%; max-width: 580px;
  max-height: calc(100vh - 3rem); overflow-y: auto;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(96, 165, 250, 0.2);
  box-shadow:
    0 40px 80px -20px rgba(0, 0, 0, 0.8),
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
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, var(--rarity-color) 25%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(10, 15, 31, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 180px; overflow: hidden;
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
  display: inline-flex; align-items: center; gap: 0.65rem;
  cursor: pointer; user-select: none; width: fit-content;
}
.stattrak-toggle__input { position: absolute; opacity: 0; pointer-events: none; }
.stattrak-toggle__box {
  width: 22px; height: 22px; border-radius: 7px;
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  display: flex; align-items: center; justify-content: center;
  color: transparent; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.stattrak-toggle__box svg {
  width: 14px; height: 14px; transform: scale(0);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.stattrak-toggle__input:checked + .stattrak-toggle__box {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border-color: rgba(96, 165, 250, 0.7);
  color: #fff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}
.stattrak-toggle__input:checked + .stattrak-toggle__box svg { transform: scale(1); }
.stattrak-toggle__label {
  font-size: 0.8rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--color-text-secondary);
}
.stattrak-toggle:hover .stattrak-toggle__label { color: #fff; }

.modal__actions {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0.75rem; margin-top: 0.5rem;
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

@media (max-width: 640px) {
  .detail-nav__inner { padding: 0.85rem 1rem; }
  .brand__sub { display: none; }
  .detail-main { padding: 2rem 1rem 4rem; }
  .skins-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.85rem; }
  .modal__head, .modal__body { padding-left: 1.25rem; padding-right: 1.25rem; }
  .modal__preview { margin-left: 1.25rem; margin-right: 1.25rem; }
  .modal__actions { grid-template-columns: 1fr; }
}
</style>
