<template>
  <div class="min-h-screen tactical-grid-bg" style="background-color: var(--color-tactical-dark);">
    <header class="relative" style="background-color: var(--color-tactical-surface); border-bottom: 2px solid var(--color-tactical-border);">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
      </div>
      <div class="container mx-auto px-4 py-6 relative z-10">
        <div class="flex justify-between items-center mb-4">
          <NuxtLink to="/" @click="activeTab = null" class="text-3xl font-bold tracking-wider slide-in-left relative group" style="color: var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.15em;">
            <span class="relative z-10">CS2 WeaponPaints</span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          </NuxtLink>
          <ClientOnly>
            <div class="slide-in-right">
              <SteamLoginBtn />
            </div>
          </ClientOnly>
        </div>

        <!-- Navigation Tabs -->
        <nav class="relative flex gap-2 overflow-visible pb-2 px-1" style="scrollbar-width: thin;">
          <button @click="setActiveTab('knives')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'knives' }]">
            <span class="nav-tab-icon">🔪</span>
            <span class="nav-tab-text">Ножи</span>
          </button>
          <button @click="setActiveTab('gloves')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'gloves' }]">
            <span class="nav-tab-icon">🧤</span>
            <span class="nav-tab-text">Перчатки</span>
          </button>
          <div class="w-px mx-2 self-stretch" style="background: linear-gradient(to bottom, transparent, rgba(255, 107, 0, 0.3), transparent);"></div>
          <button @click="setActiveTab('pistols')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'pistols' }]">
            <span class="nav-tab-text">Пистолеты</span>
          </button>
          <button @click="setActiveTab('rifles')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'rifles' }]">
            <span class="nav-tab-text">Винтовки</span>
          </button>
          <button @click="setActiveTab('smgs')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'smgs' }]">
            <span class="nav-tab-text">ПП</span>
          </button>
          <button @click="setActiveTab('snipers')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'snipers' }]">
            <span class="nav-tab-text">Снайперки</span>
          </button>
          <button @click="setActiveTab('heavy')" :class="['nav-tab', { 'nav-tab-active': activeTab === 'heavy' }]">
            <span class="nav-tab-text">Тяжелое</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="mx-auto px-4 py-12" style="max-width: 1600px;">
      <ClientOnly>
        <div v-if="!user.authenticated" class="text-center py-32 scale-in">
          <div class="relative inline-block mb-8">
            <h1 class="text-6xl font-bold mb-6 tracking-wide relative z-10" style="text-transform: uppercase; letter-spacing: 0.1em;">
              <span class="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Добро пожаловать
              </span>
            </h1>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-30 blur-3xl"></div>
          </div>
          <p class="text-xl mb-12 tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Войдите через Steam чтобы выбрать скины для оружия
          </p>
          <div class="flex justify-center gap-4">
            <div class="w-16 h-1 rounded-full pulse-glow" style="background-color: var(--color-accent-primary);"></div>
            <div class="w-16 h-1 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.2s;"></div>
            <div class="w-16 h-1 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.4s;"></div>
          </div>
        </div>

        <div v-else>
          <!-- Show all categories view when no tab is active -->
          <div v-if="!activeTab">
            <div class="mb-12 scale-in">
              <h1 class="text-5xl font-bold mb-4 tracking-wide relative inline-block" style="text-transform: uppercase; letter-spacing: 0.1em;">
                <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Выберите оружие
                </span>
                <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div
                @click="setActiveTab('knives')"
                class="stagger-item relative group rounded-lg p-8 cursor-pointer transition-all shimmer-effect overflow-hidden"
                style="animation-delay: 0s; background-color: var(--color-tactical-elevated); border: 2px solid var(--color-tactical-border);"
              >
                <div class="corner-brackets" style="color: var(--color-accent-primary);"></div>
                <div class="corner-brackets-full" style="color: var(--color-accent-primary);"></div>
                <div class="scan-line"></div>
                <div class="relative z-10">
                  <div class="text-4xl mb-4">🔪</div>
                  <h2 class="text-2xl font-bold mb-3 tracking-wide group-hover:text-orange-500 transition-colors" style="text-transform: uppercase; letter-spacing: 0.05em;">
                    Ножи
                  </h2>
                  <p class="tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;">
                    Выбрать нож
                  </p>
                </div>
                <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/5 transition-all duration-500"></div>
              </div>

              <div
                @click="setActiveTab('gloves')"
                class="stagger-item relative group rounded-lg p-8 cursor-pointer transition-all shimmer-effect overflow-hidden"
                style="animation-delay: 0.1s; background-color: var(--color-tactical-elevated); border: 2px solid var(--color-tactical-border);"
              >
                <div class="corner-brackets" style="color: var(--color-accent-primary);"></div>
                <div class="corner-brackets-full" style="color: var(--color-accent-primary);"></div>
                <div class="scan-line"></div>
                <div class="relative z-10">
                  <div class="text-4xl mb-4">🧤</div>
                  <h2 class="text-2xl font-bold mb-3 tracking-wide group-hover:text-orange-500 transition-colors" style="text-transform: uppercase; letter-spacing: 0.05em;">
                    Перчатки
                  </h2>
                  <p class="tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;">
                    Выбрать перчатки
                  </p>
                </div>
                <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/5 transition-all duration-500"></div>
              </div>
            </div>

            <div class="mt-16">
              <div class="mb-12 scale-in">
                <h2 class="text-4xl font-bold mb-4 tracking-wide relative inline-block" style="text-transform: uppercase; letter-spacing: 0.1em;">
                  <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Оружие по категориям
                  </span>
                  <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                </h2>
              </div>

              <div v-for="(weapons, category) in weaponsByCategory" :key="category" class="mb-12">
                <h3 class="text-2xl font-semibold mb-6 capitalize tracking-wide flex items-center gap-3" style="color: var(--color-accent-primary); text-transform: uppercase; letter-spacing: 0.05em;">
                  <div class="w-2 h-2 rounded-full pulse-glow" style="background-color: var(--color-accent-primary);"></div>
                  {{ tabTitles[category] }}
                  <div class="flex-1 h-px" style="background: linear-gradient(to right, var(--color-accent-primary), transparent);"></div>
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  <NuxtLink
                    v-for="(weapon, index) in weapons"
                    :key="weapon.id"
                    :to="`/weapon/${weapon.id}`"
                    class="stagger-item relative group rounded-lg p-5 cursor-pointer transition-all text-center overflow-hidden"
                    :style="{
                      animationDelay: `${index * 0.03}s`,
                      backgroundColor: 'var(--color-tactical-surface)',
                      border: '1px solid var(--color-tactical-border)',
                    }"
                  >
                    <div class="corner-brackets" style="color: var(--color-accent-primary); opacity: 0; transition: opacity 0.3s;"></div>
                    <div class="relative z-10 font-medium tracking-wide group-hover:text-orange-500 transition-colors" style="font-size: 0.875rem;">
                      {{ weapon.name }}
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:to-amber-500/10 transition-all duration-300"></div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab view when a specific tab is active -->
          <div v-else>
            <div class="mb-12 scale-in">
              <h1 class="text-5xl font-bold mb-4 tracking-wide relative inline-block" style="text-transform: uppercase; letter-spacing: 0.1em;">
                <span class="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {{ tabTitles[activeTab] }}
                </span>
                <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </h1>
            </div>

            <Transition name="tab-fade" mode="out-in">
              <!-- Knives Tab -->
              <div v-if="activeTab === 'knives'" key="knives">
                <div v-if="loading" class="text-center py-32">
                  <div class="inline-flex flex-col items-center gap-6">
                    <div class="flex gap-2">
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary);"></div>
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.2s;"></div>
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.4s;"></div>
                    </div>
                    <div class="text-xl tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                      Загрузка...
                    </div>
                  </div>
                </div>
                <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  <NuxtLink
                    v-for="(knife, index) in knifeTypes"
                    :key="knife.weapon_id"
                    :to="`/knife/${knife.weapon_id}`"
                    class="stagger-item relative group rounded-lg py-8 px-6 cursor-pointer transition-all text-center overflow-hidden shimmer-on-hover"
                    :style="{
                      animationDelay: `${index * 0.05}s`,
                      backgroundColor: 'var(--color-tactical-elevated)',
                      border: '2px solid var(--color-tactical-border)',
                    }"
                    @mouseenter="onKnifeHover($event, true)"
                    @mouseleave="onKnifeHover($event, false)"
                  >
                    <div class="corner-brackets" style="color: var(--color-accent-primary);"></div>
                    <div class="scan-line"></div>
                    <div class="relative z-10">
                      <div class="mb-4 h-32 flex items-center justify-center">
                        <img
                          v-if="getKnifeImage(knife.weapon_id)"
                          :src="getKnifeImage(knife.weapon_id)"
                          :alt="knife.name"
                          class="max-h-full max-w-full object-contain float-animation-item"
                        />
                        <div v-else class="text-3xl float-animation-item">🔪</div>
                      </div>
                      <div class="font-bold tracking-wide group-hover:text-orange-500 transition-colors" style="text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;">
                        {{ knife.name }}
                      </div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:to-amber-500/10 transition-all duration-500"></div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Gloves Tab -->
              <div v-else-if="activeTab === 'gloves'" key="gloves">
                <div v-if="loading" class="text-center py-32">
                  <div class="inline-flex flex-col items-center gap-6">
                    <div class="flex gap-2">
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary);"></div>
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.2s;"></div>
                      <div class="w-3 h-3 rounded-full pulse-glow" style="background-color: var(--color-accent-primary); animation-delay: 0.4s;"></div>
                    </div>
                    <div class="text-xl tracking-wide" style="color: var(--color-tactical-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                      Загрузка...
                    </div>
                  </div>
                </div>
                <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  <NuxtLink
                    v-for="(glove, index) in gloveTypes"
                    :key="glove.weapon_id"
                    :to="`/glove/${glove.weapon_id}`"
                    class="stagger-item relative group rounded-lg py-8 px-6 cursor-pointer transition-all text-center overflow-hidden shimmer-on-hover"
                    :style="{
                      animationDelay: `${index * 0.05}s`,
                      backgroundColor: 'var(--color-tactical-elevated)',
                      border: '2px solid var(--color-tactical-border)',
                    }"
                    @mouseenter="onGloveHover($event, true)"
                    @mouseleave="onGloveHover($event, false)"
                  >
                    <div class="corner-brackets" style="color: var(--color-accent-primary);"></div>
                    <div class="scan-line"></div>
                    <div class="relative z-10">
                      <div class="mb-4 h-32 flex items-center justify-center">
                        <img
                          v-if="getGloveImage(glove.weapon_id)"
                          :src="getGloveImage(glove.weapon_id)"
                          :alt="glove.name"
                          class="max-h-full max-w-full object-contain float-animation-item"
                        />
                        <div v-else class="text-3xl float-animation-item">🧤</div>
                      </div>
                      <div class="font-bold tracking-wide group-hover:text-orange-500 transition-colors" style="text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;">
                        {{ glove.name }}
                      </div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:to-amber-500/10 transition-all duration-500"></div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Weapons Tabs -->
              <div v-else :key="activeTab">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  <NuxtLink
                    v-for="(weapon, index) in weaponsByCategory[activeTab]"
                    :key="weapon.id"
                    :to="`/weapon/${weapon.id}`"
                    class="stagger-item relative group rounded-lg py-8 px-6 cursor-pointer transition-all text-center overflow-hidden"
                    :style="{
                      animationDelay: `${index * 0.03}s`,
                      backgroundColor: 'var(--color-tactical-surface)',
                      border: '1px solid var(--color-tactical-border)',
                    }"
                  >
                    <div class="corner-brackets" style="color: var(--color-accent-primary); opacity: 0; transition: opacity 0.3s;"></div>
                    <div class="relative z-10">
                      <div class="mb-4 h-32 flex items-center justify-center">
                        <img
                          v-if="getWeaponImage(weapon.id)"
                          :src="getWeaponImage(weapon.id)"
                          :alt="weapon.name"
                          class="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div class="font-medium tracking-wide group-hover:text-orange-500 transition-colors" style="font-size: 0.875rem;">
                        {{ weapon.name }}
                      </div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:to-amber-500/10 transition-all duration-300"></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import { WEAPON_MAP, getWeaponCategory, getDefaultWeaponImage } from '~/utils/weapons'

const route = useRoute()
const router = useRouter()
const { user, fetchUser } = useSteamAuth()
const { skins, loading, fetchSkins } = useSkinsData()
const { playerSkins, fetchPlayerSkins } = usePlayerSkins()

// Initialize activeTab from URL query immediately (before mount)
const activeTab = ref<string | null>((route.query.tab as string) || null)

const tabTitles: Record<string, string> = {
  knives: 'Ножи',
  gloves: 'Перчатки',
  pistols: 'Пистолеты',
  rifles: 'Винтовки',
  smgs: 'Пистолеты-пулеметы',
  snipers: 'Снайперские винтовки',
  heavy: 'Тяжелое оружие'
}

onMounted(async () => {
  await fetchUser()
  await fetchSkins()
  await fetchPlayerSkins()
})

const setActiveTab = (tab: string) => {
  activeTab.value = tab
  router.push({ query: { tab } })
}

const weaponsByCategory = computed(() => {
  const result: Record<string, Array<{ id: number; name: string }>> = {
    pistols: [],
    rifles: [],
    smgs: [],
    heavy: [],
    snipers: [],
  }

  for (const [id, name] of Object.entries(WEAPON_MAP)) {
    const weaponId = parseInt(id)
    const category = getWeaponCategory(weaponId)
    if (result[category]) {
      result[category].push({ id: weaponId, name })
    }
  }

  return result
})

const knifeTypes = computed(() => {
  const knives = skins.value.filter(skin =>
    skin.category?.id === 'sfui_invpanel_filter_melee'
  )

  const uniqueKnives = new Map()
  knives.forEach(skin => {
    if (skin.weapon && !uniqueKnives.has(skin.weapon.weapon_id)) {
      uniqueKnives.set(skin.weapon.weapon_id, {
        weapon_id: skin.weapon.weapon_id,
        name: skin.weapon.name
      })
    }
  })

  return Array.from(uniqueKnives.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
})

const gloveTypes = computed(() => {
  const gloves = skins.value.filter(skin =>
    skin.category?.id === 'sfui_invpanel_filter_gloves'
  )

  const uniqueGloves = new Map()
  gloves.forEach(skin => {
    if (skin.weapon && !uniqueGloves.has(skin.weapon.weapon_id)) {
      uniqueGloves.set(skin.weapon.weapon_id, {
        weapon_id: skin.weapon.weapon_id,
        name: skin.weapon.name
      })
    }
  })

  return Array.from(uniqueGloves.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
})

// Get knife image - either selected skin or default knife
const getKnifeImage = (weaponId: number) => {
  // Check if player has selected a skin for this knife (check both teams)
  const playerSkinT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 2
  )
  const playerSkinCT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 3
  )

  // Prefer T side, fallback to CT side
  const playerSkin = playerSkinT || playerSkinCT

  if (playerSkin && playerSkin.weapon_paint_id) {
    // Find the skin by paint_index
    const selectedSkin = skins.value.find(
      skin => skin.weapon?.weapon_id === weaponId &&
              parseInt(skin.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) {
      return selectedSkin.image
    }
  }

  // Return vanilla knife - find skin without " | " in name (vanilla has no pattern)
  const knifeSkins = skins.value.filter(
    skin => skin.weapon?.weapon_id === weaponId
  )

  const vanillaSkin = knifeSkins.find(skin => !skin.name.includes(' | '))

  if (vanillaSkin) return vanillaSkin.image

  // Fallback to lowest paint_index
  const sortedSkins = knifeSkins
    .filter(s => s.paint_index)
    .sort((a, b) => parseInt(a.paint_index) - parseInt(b.paint_index))
  return sortedSkins[0]?.image || ''
}

// Get glove image - either selected skin or default glove
const getGloveImage = (weaponId: number) => {
  const playerSkinT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 2
  )
  const playerSkinCT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 3
  )

  const playerSkin = playerSkinT || playerSkinCT

  if (playerSkin && playerSkin.weapon_paint_id) {
    const selectedSkin = skins.value.find(
      skin => skin.weapon?.weapon_id === weaponId &&
              parseInt(skin.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) {
      return selectedSkin.image
    }
  }

  const gloveSkins = skins.value.filter(
    skin => skin.weapon?.weapon_id === weaponId
  )

  const vanillaSkin = gloveSkins.find(skin => !skin.name.includes(' | '))

  if (vanillaSkin) return vanillaSkin.image

  const sortedSkins = gloveSkins
    .filter(s => s.paint_index)
    .sort((a, b) => parseInt(a.paint_index) - parseInt(b.paint_index))
  return sortedSkins[0]?.image || ''
}

// Get weapon image - either selected skin or default weapon
const getWeaponImage = (weaponId: number) => {
  const playerSkinT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 2
  )
  const playerSkinCT = playerSkins.value.find(
    skin => skin.weapon_defindex === weaponId && skin.weapon_team === 3
  )

  const playerSkin = playerSkinT || playerSkinCT

  if (playerSkin && playerSkin.weapon_paint_id) {
    const selectedSkin = skins.value.find(
      skin => skin.weapon?.weapon_id === weaponId &&
              parseInt(skin.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) {
      return selectedSkin.image
    }
  }

  // Return default weapon image from CS2-WeaponPaints
  return getDefaultWeaponImage(weaponId)
}

// GSAP animations for hover
import gsap from 'gsap'

const onKnifeHover = (event: MouseEvent, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  const floatItem = target.querySelector('.float-animation-item')

  if (!floatItem) return

  if (isEnter) {
    gsap.to(floatItem, {
      y: -10,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    })
  } else {
    gsap.to(floatItem, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    })
  }
}

const onGloveHover = (event: MouseEvent, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  const floatItem = target.querySelector('.float-animation-item')

  if (!floatItem) return

  if (isEnter) {
    gsap.to(floatItem, {
      y: -10,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    })
  } else {
    gsap.to(floatItem, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true
    })
  }
}

</script>

<style scoped>
/* Liquid Glass Navigation Tabs - Apple Style */
.nav-tab {
  position: relative;
  padding: 0.875rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  white-space: nowrap;
  font-size: 0.875rem;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: visible;
  z-index: 1;
}

/* Liquid glass glow effect */
.nav-tab::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle at 50% 0%,
    rgba(255, 107, 0, 0.2) 0%,
    rgba(255, 107, 0, 0.05) 50%,
    transparent 100%
  );
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.6s ease;
  filter: blur(12px);
  z-index: -1;
}

/* Hover state - liquid morphing */
.nav-tab:hover:not(.nav-tab-active) {
  color: #fff;
  background: rgba(255, 107, 0, 0.15);
  border-color: rgba(255, 107, 0, 0.3);
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 8px 32px rgba(255, 107, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  overflow: hidden;
}

.nav-tab:hover:not(.nav-tab-active)::before {
  opacity: 1;
}

/* Shimmer effect on hover for non-active tabs */
.nav-tab:hover:not(.nav-tab-active)::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 2s ease-in-out infinite;
  border-radius: 1rem;
}

/* Icon animations */
.nav-tab-icon {
  font-size: 1.125rem;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: grayscale(0.3) brightness(0.9);
}

.nav-tab:hover:not(.nav-tab-active) .nav-tab-icon {
  transform: scale(1.15) rotate(-5deg);
  filter: grayscale(0) brightness(1.2) drop-shadow(0 0 8px rgba(255, 107, 0, 0.6));
}

.nav-tab-text {
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.4s ease;
}

/* Active state - full liquid glass effect */
.nav-tab-active {
  color: #fff;
  background: linear-gradient(135deg,
    rgba(255, 107, 0, 0.35) 0%,
    rgba(251, 146, 60, 0.25) 50%,
    rgba(255, 107, 0, 0.35) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 0, 0.5);
  box-shadow:
    0 8px 32px rgba(255, 107, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset,
    0 2px 8px rgba(0, 0, 0, 0.3) inset;
  transform: translateY(-2px);
  overflow: hidden;
}

/* Active glow - liquid effect */
.nav-tab-active::before {
  opacity: 1;
  background: radial-gradient(circle at 50% 0%,
    rgba(255, 107, 0, 0.5) 0%,
    rgba(251, 191, 36, 0.3) 50%,
    transparent 100%
  );
  filter: blur(20px);
  animation: liquid-pulse 3s ease-in-out infinite;
}

/* Shimmer effect on active tab */
.nav-tab-active::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  animation: shimmer 3s ease-in-out infinite;
  border-radius: 1rem;
}

.nav-tab-active .nav-tab-icon {
  filter: grayscale(0) brightness(1.3) drop-shadow(0 0 12px rgba(255, 107, 0, 1));
  animation: float-icon 3s ease-in-out infinite;
}

.nav-tab-active .nav-tab-text {
  text-shadow: 0 0 20px rgba(255, 107, 0, 0.6);
}

/* Animations */
@keyframes liquid-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 200%;
  }
}

@keyframes float-icon {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.05);
  }
}

/* Content fade animation */
.fade-in {
  animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Vue Transition for tab content */
.tab-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}

/* Smooth content transitions */
.tab-content-enter-active,
.tab-content-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-content-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.98);
}

.tab-content-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.98);
}
</style>
