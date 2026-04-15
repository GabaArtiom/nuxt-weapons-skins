<template>
  <div class="min-h-screen tactical-grid-bg">
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
        <NuxtLink to="/" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          Назад
        </NuxtLink>

        <div class="detail-title-wrap">
          <div class="detail-eyebrow">
            <span class="detail-eyebrow__dot"></span>
            Agent Selection
          </div>
          <h1 class="detail-title gradient-text-primary">Агенты</h1>
          <p class="detail-sub">Выберите оперативника для T и CT. Каждый агент со своим стилем.</p>
        </div>
      </div>

      <div v-if="loading" class="loading-wrap">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
        <div class="loading-text">Загрузка агентов</div>
      </div>

      <div v-else>
        <div class="agent-search">
          <svg class="agent-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            placeholder="Поиск агента"
            class="agent-search__input"
          />
        </div>

        <div v-for="team in ['Terrorists', 'Counter-Terrorists']" :key="team" class="team-block">
          <div class="team-head" :class="team === 'Terrorists' ? 'team-head--t' : 'team-head--ct'">
            <span class="team-head__badge">{{ team === 'Terrorists' ? 'T' : 'CT' }}</span>
            <span class="team-head__title">{{ team }}</span>
            <span class="team-head__count">{{ getAgentsByTeam(team).length }}</span>
            <div class="team-head__line"></div>
          </div>

          <div class="agents-grid">
            <div
              v-for="(agent, index) in getAgentsByTeam(team)"
              :key="agent.id"
              class="agent-card stagger-item"
              :style="{
                animationDelay: `${Math.min(index * 0.04, 0.6)}s`,
                '--rarity-color': agent.rarity.color,
              }"
            >
              <div class="agent-card__shine scan-line"></div>
              <div class="agent-card__img">
                <div class="agent-card__img-glow"></div>
                <img :src="agent.image" :alt="agent.name" loading="lazy" />
              </div>
              <div class="agent-card__body">
                <div class="agent-card__name">{{ agent.name }}</div>
                <div class="agent-card__desc">{{ agent.description }}</div>
                <div class="agent-card__rarity">
                  <span class="agent-card__rarity-dot"></span>
                  {{ agent.rarity.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Agent } from '~/utils/skins'

const searchQuery = ref('')
const agents = ref<Agent[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    agents.value = await $fetch('/api/csgo/agents')
  } finally {
    loading.value = false
  }
})

const filteredAgents = computed(() => {
  if (!searchQuery.value) return agents.value
  return agents.value.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getAgentsByTeam = (teamName: string) => {
  return filteredAgents.value.filter(agent => agent.team.name === teamName)
}
</script>

<style scoped>
.detail-nav {
  position: sticky; top: 0; z-index: 40;
  background: rgba(10, 15, 31, 0.65);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.detail-nav::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), transparent);
}
.detail-nav__inner {
  max-width: 1600px; margin: 0 auto; padding: 1rem 1.5rem;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
}

.brand { display: flex; align-items: center; gap: 0.85rem; text-decoration: none; }
.brand__mark {
  position: relative; width: 44px; height: 44px; border-radius: 12px;
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

/* Loading */
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

/* Search */
.agent-search {
  position: relative;
  max-width: 520px;
  margin-bottom: 3rem;
}
.agent-search__icon {
  position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
  width: 18px; height: 18px; color: var(--color-text-muted); pointer-events: none;
  transition: color 0.25s;
}
.agent-search__input {
  width: 100%; padding: 0.95rem 1rem 0.95rem 2.85rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fff; font-size: 0.9rem; font-weight: 500; outline: none;
  transition: all 0.25s;
}
.agent-search__input::placeholder { color: var(--color-text-muted); }
.agent-search__input:focus {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}
.agent-search:focus-within .agent-search__icon { color: var(--color-accent-glow); }

/* Team header */
.team-block { margin-bottom: 3.5rem; }

.team-head {
  display: flex; align-items: center; gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.team-head__badge {
  --team-color: #F59E0B;
  display: inline-flex; align-items: center; justify-content: center;
  width: 42px; height: 42px; border-radius: 12px;
  font-family: var(--font-mono); font-weight: 700; font-size: 0.9rem; color: #fff;
  background: linear-gradient(135deg, var(--team-color), color-mix(in srgb, var(--team-color) 70%, black));
  box-shadow: 0 6px 18px color-mix(in srgb, var(--team-color) 45%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  letter-spacing: 0.05em;
}

.team-head--t .team-head__badge { --team-color: #F59E0B; }
.team-head--ct .team-head__badge { --team-color: #3B82F6; }

.team-head__title {
  font-size: 1.5rem; font-weight: 700; color: #fff;
  letter-spacing: -0.01em;
}

.team-head__count {
  font-family: var(--font-mono);
  font-size: 0.72rem; font-weight: 600;
  color: var(--color-text-muted);
  padding: 0.25rem 0.55rem;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.team-head__line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(96, 165, 250, 0.35), transparent);
}

.team-head--t .team-head__line {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.4), transparent);
}

/* Agents grid */
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.agent-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.7) 100%);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45),
    0 0 0 1px color-mix(in srgb, var(--rarity-color) 20%, transparent) inset;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.3s;
  isolation: isolate;
}

.agent-card::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--rarity-color) 55%, transparent), rgba(96, 165, 250, 0.25) 45%, transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.35s;
}

.agent-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 22px 50px -12px color-mix(in srgb, var(--rarity-color) 35%, rgba(0, 0, 0, 0.6)),
    0 0 0 1px color-mix(in srgb, var(--rarity-color) 45%, transparent) inset;
  border-color: color-mix(in srgb, var(--rarity-color) 40%, transparent);
}

.agent-card:hover::after { opacity: 1; }

.agent-card__shine { opacity: 0; transition: opacity 0.4s; color: var(--rarity-color); }
.agent-card:hover .agent-card__shine { opacity: 1; }

.agent-card__img {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex; align-items: center; justify-content: center;
  padding: 1.25rem;
  background:
    radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--rarity-color) 22%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.4), rgba(10, 15, 31, 0.55));
  overflow: hidden;
}

.agent-card__img-glow {
  position: absolute; inset: -20%;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--rarity-color) 25%, transparent), transparent 60%);
  filter: blur(30px); opacity: 0.6; transition: opacity 0.4s;
  pointer-events: none;
}

.agent-card:hover .agent-card__img-glow { opacity: 1; }

.agent-card__img img {
  max-width: 100%; max-height: 100%; object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative; z-index: 1;
}

.agent-card:hover .agent-card__img img {
  transform: scale(1.08) translateY(-3px);
}

.agent-card__body {
  padding: 1rem 1.15rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.4rem;
}

.agent-card__name {
  font-size: 0.95rem; font-weight: 600; color: #fff;
  letter-spacing: 0.01em; line-height: 1.25;
}

.agent-card__desc {
  font-size: 0.75rem; color: var(--color-text-muted);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.agent-card__rarity {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--rarity-color);
  text-shadow: 0 0 10px color-mix(in srgb, var(--rarity-color) 60%, transparent);
  margin-top: 0.2rem;
}

.agent-card__rarity-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--rarity-color);
  box-shadow: 0 0 6px var(--rarity-color);
}

@media (max-width: 640px) {
  .detail-nav__inner { padding: 0.85rem 1rem; }
  .brand__sub { display: none; }
  .detail-main { padding: 2rem 1rem 4rem; }
  .agents-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.85rem; }
}
</style>
