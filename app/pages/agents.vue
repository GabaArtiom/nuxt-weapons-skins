<template>
  <div class="min-h-screen tactical-grid-bg" style="background-color: var(--color-tactical-dark);">
    <header class="relative" style="background-color: var(--color-tactical-surface); border-bottom: 2px solid var(--color-tactical-border);">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
      </div>
      <div class="container mx-auto px-4 py-6 relative z-10">
        <div class="flex justify-between items-center mb-4">
          <NuxtLink to="/" class="text-3xl font-bold tracking-wider slide-in-left relative group" style="color: var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.15em;">
            <span class="relative z-10">CS2 WeaponPaints</span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          </NuxtLink>
          <div class="slide-in-right">
            <SteamLoginBtn />
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex gap-2 overflow-x-auto pb-2" style="scrollbar-width: thin;">
          <NuxtLink
            to="/knives"
            class="px-4 py-2 rounded-lg font-medium tracking-wide transition-all whitespace-nowrap text-sm hover:scale-105"
            style="background-color: var(--color-tactical-elevated); border: 1px solid var(--color-tactical-border); text-transform: uppercase; letter-spacing: 0.05em;"
          >
            🔪 Ножи
          </NuxtLink>
          <NuxtLink
            to="/gloves"
            class="px-4 py-2 rounded-lg font-medium tracking-wide transition-all whitespace-nowrap text-sm hover:scale-105"
            style="background-color: var(--color-tactical-elevated); border: 1px solid var(--color-tactical-border); text-transform: uppercase; letter-spacing: 0.05em;"
          >
            🧤 Перчатки
          </NuxtLink>
          <NuxtLink
            to="/agents"
            class="px-4 py-2 rounded-lg font-medium tracking-wide transition-all whitespace-nowrap text-sm glow-effect"
            style="background-color: var(--color-tactical-elevated); border: 1px solid var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.05em;"
          >
            👤 Агенты
          </NuxtLink>
          <div class="w-px" style="background-color: var(--color-tactical-border);"></div>
          <NuxtLink
            to="/"
            class="px-4 py-2 rounded-lg font-medium tracking-wide transition-all whitespace-nowrap text-sm hover:scale-105"
            style="background-color: var(--color-tactical-elevated); border: 1px solid var(--color-tactical-border); text-transform: uppercase; letter-spacing: 0.05em;"
          >
            Оружие
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <div class="mb-8 slide-in-left">
        <NuxtLink to="/" class="inline-flex items-center gap-2 hover:gap-3 transition-all tracking-wide" style="color: var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </NuxtLink>
      </div>

      <div class="mb-12 scale-in">
        <h1 class="text-5xl font-bold mb-4 tracking-wide relative inline-block" style="text-transform: uppercase; letter-spacing: 0.1em;">
          <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Агенты
          </span>
          <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </h1>
        <p class="text-lg mt-6 tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em;">
          👤 Выберите агента для T и CT
        </p>
      </div>

      <div v-if="loading" class="text-center py-32">
        <div class="inline-flex flex-col items-center gap-6">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary);"></div>
            <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.2s;"></div>
            <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.4s;"></div>
          </div>
          <div class="text-xl tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Загрузка агентов...
          </div>
        </div>
      </div>

      <div v-else>
        <div class="mb-12 scale-in">
          <div class="relative max-w-2xl">
            <input
              v-model="searchQuery"
              placeholder="Поиск агента..."
              class="w-full px-4 py-3 pl-10 rounded-lg text-white font-medium tracking-wide"
              style="background-color: var(--color-tactical-surface); border: 1px solid var(--color-tactical-border); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--color-tactical-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div class="space-y-16">
          <div v-for="team in ['Terrorists', 'Counter-Terrorists']" :key="team">
            <h2 class="text-3xl font-bold mb-8 tracking-wide flex items-center gap-3" style="text-transform: uppercase; letter-spacing: 0.05em;">
              <div class="w-2 h-2 rounded-full pulse-glow" :style="{ backgroundColor: team === 'Terrorists' ? '#d97706' : '#2563eb' }"></div>
              <span :style="{ color: team === 'Terrorists' ? '#d97706' : '#2563eb' }">{{ team }}</span>
              <div class="flex-1 h-px" :style="{ background: `linear-gradient(to right, ${team === 'Terrorists' ? '#d97706' : '#2563eb'}, transparent)` }"></div>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div
                v-for="(agent, index) in getAgentsByTeam(team)"
                :key="agent.id"
                class="stagger-item relative group rounded-lg overflow-hidden cursor-pointer transition-all shimmer-effect"
                :style="{
                  animationDelay: `${index * 0.05}s`,
                  backgroundColor: 'var(--color-tactical-elevated)',
                  border: `2px solid ${agent.rarity.color}`,
                }"
              >
                <div class="corner-brackets" :style="{ color: agent.rarity.color }"></div>
                <div class="scan-line"></div>

                <div class="aspect-square flex items-center justify-center p-4 relative" style="background-color: var(--color-tactical-surface);">
                  <img :src="agent.image" :alt="agent.name" class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div class="p-4 relative z-10">
                  <div class="font-bold text-white mb-2 tracking-wide group-hover:text-orange-500 transition-colors" style="font-size: 0.875rem;">
                    {{ agent.name }}
                  </div>
                  <div class="text-xs mb-3 tracking-wide" style="color: var(--color-tactical-muted);">
                    {{ agent.description }}
                  </div>
                  <div :style="{ color: agent.rarity.color }" class="text-xs font-medium tracking-wide" style="text-transform: uppercase; letter-spacing: 0.05em;">
                    {{ agent.rarity.name }}
                  </div>
                </div>

                <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/5 transition-all duration-500"></div>
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
