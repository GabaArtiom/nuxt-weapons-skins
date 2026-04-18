<template>
  <div class="min-h-screen tactical-grid-bg">
    <!-- ====================================== -->
    <!-- STICKY GLASS NAVBAR                    -->
    <!-- ====================================== -->
    <header class="site-nav" :class="{ 'site-nav--scrolled': scrolled }">
      <div class="site-nav__inner">
        <div class="site-nav__row">
          <NuxtLink to="/" @click="activeTab = null" class="brand slide-in-left">
            <div class="brand__mark">
              <div class="brand__mark-inner">CS</div>
              <div class="brand__mark-glow"></div>
            </div>
            <div class="brand__text">
              <span class="brand__title gradient-text-accent">WeaponPaints</span>
              <span class="brand__sub">Premium Skin Arsenal · 2026</span>
            </div>
          </NuxtLink>

          <ClientOnly>
            <div class="slide-in-right">
              <SteamLoginBtn />
            </div>
          </ClientOnly>
        </div>

        <nav class="nav-tabs">
          <button @click="setActiveTab('knives')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'knives' }]">
            <span class="nav-tab__text">Knives</span>
          </button>
          <button @click="setActiveTab('gloves')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'gloves' }]">
            <span class="nav-tab__text">Gloves</span>
          </button>
          <div class="nav-tabs__sep"></div>
          <button @click="setActiveTab('pistols')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'pistols' }]">
            <span class="nav-tab__text">Pistols</span>
          </button>
          <button @click="setActiveTab('rifles')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'rifles' }]">
            <span class="nav-tab__text">Rifles</span>
          </button>
          <button @click="setActiveTab('smgs')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'smgs' }]">
            <span class="nav-tab__text">SMG</span>
          </button>
          <button @click="setActiveTab('snipers')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'snipers' }]">
            <span class="nav-tab__text">Snipers</span>
          </button>
          <button @click="setActiveTab('heavy')" :class="['nav-tab', { 'nav-tab--active': activeTab === 'heavy' }]">
            <span class="nav-tab__text">Heavy</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="main-wrap" :class="{ 'team-t': selectedTeam === 2 }">
      <ClientOnly>
        <!-- ====================================== -->
        <!-- HERO (unauthenticated)                  -->
        <!-- ====================================== -->
        <section v-if="!user.authenticated" class="hero scale-in">
          <div class="hero-orb hero-orb--1"></div>
          <div class="hero-orb hero-orb--2"></div>
          <div class="hero-orb hero-orb--3"></div>

          <div class="hero__content">
            <div class="hero__badge">
              <span class="hero__badge-dot"></span>
              <span>Steam Auth Required</span>
            </div>

            <h1 class="hero__title">
              <span class="gradient-text-primary">Craft your</span><br />
              <span class="gradient-text-accent">perfect loadout</span>
            </h1>

            <p class="hero__subtitle">
              Премиум-интерфейс для выбора, превью и смены скинов CS2.
              Войди через Steam — и получи полный контроль над своим арсеналом.
            </p>

            <div class="hero__cta">
              <SteamLoginBtn />
              <a href="#features" class="btn-ghost">Узнать больше</a>
            </div>

            <div class="hero__stats">
              <div class="stat">
                <div class="stat__value">2.5K+</div>
                <div class="stat__label">Skins</div>
              </div>
              <div class="stat stat--div"></div>
              <div class="stat">
                <div class="stat__value">40+</div>
                <div class="stat__label">Weapons</div>
              </div>
              <div class="stat stat--div"></div>
              <div class="stat">
                <div class="stat__value">∞</div>
                <div class="stat__label">Combos</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ====================================== -->
        <!-- AUTHENTICATED                          -->
        <!-- ====================================== -->
        <div v-else>
          <!-- No active tab → overview -->
          <div v-if="!activeTab">
            <div class="section-head scale-in">
              <div>
                <div class="section-head__eyebrow">
                  <span class="section-head__dot"></span>
                  Your arsenal
                </div>
                <h1 class="section-head__title gradient-text-primary">Выберите оружие</h1>
                <p class="section-head__sub">Ножи, перчатки или любая пушка — одним кликом.</p>
              </div>

              <TeamToggle v-model="selectedTeam" />
            </div>

            <!-- Knives & Gloves featured -->
            <div class="featured-grid">
              <div
                @click="setActiveTab('knives')"
                class="featured-card glass-card stagger-item"
                style="animation-delay: 0s;"
              >
                <div class="featured-card__shine scan-line"></div>
                <div class="featured-card__content">
                  <div class="featured-card__icon">
                    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M311.96 258.5L105.55 484l-30-28.31L288.92 236.7zM139.77 417.7a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.3-10.47zm23.74-25.14a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.29-10.44zm23.76-25.11a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.3-10.47zm23.74-25.15a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.3-10.47zm23.76-25.14a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.3-10.47zm23.74-25.14a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.31-10.47zm23.74-25.14a7.41 7.41 0 1 0 .3 10.47 7.41 7.41 0 0 0-.3-10.47zM52.67 433.13l-28.26-30 225.85-206 21.71 23.02zm36.9-63.05a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .33-10.47zm25.2-23.7a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.47zm25.17-23.68a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.47zm25.18-23.7a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.5zm25.18-23.7a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.5zm25.18-23.7a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.51zm25.18-23.7a7.41 7.41 0 1 0-.32 10.47 7.41 7.41 0 0 0 .32-10.51zm63.89 1.63c12.87-10.8 25.09-20.92 37-30.79C425.04 129.57 475.68 87.63 487.59 28c-8.36 6.7-63.45 50.38-92.82 58.58l-114 119.47z"/>
                    </svg>
                  </div>
                  <h2 class="featured-card__title">Ножи</h2>
                  <p class="featured-card__desc">Каждое движение подчёркнуто стилем</p>
                  <div class="featured-card__cta">
                    Выбрать нож
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                </div>
                <div class="featured-card__preview">
                  <img v-if="equippedKnifeImage" :src="equippedKnifeImage" alt="Текущий нож" />
                  <div v-else class="featured-card__preview-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
                  </div>
                </div>
              </div>

              <div
                @click="setActiveTab('gloves')"
                class="featured-card glass-card stagger-item"
                style="animation-delay: 0.08s;"
              >
                <div class="featured-card__shine scan-line"></div>
                <div class="featured-card__content">
                  <div class="featured-card__icon">
                    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M403.975,312.052V120.966c0-29.174-23.734-52.908-52.908-52.908c-5.935,0-11.645,0.983-16.975,2.793 c-8.947-27.967-39.245-43.584-67.385-34.029C259.885,15.488,239.867,0,216.299,0c-23.568,0-43.586,15.488-50.409,36.822 c-34.274-11.64-69.883,14.024-69.883,50.115v65.972c-33.746-9.612-67.384,15.876-67.384,50.894V312.05 c0,31.337,21.181,57.823,49.977,65.893c0,10.89,0,101.782,0,114.838c0,10.612,8.604,19.216,19.216,19.216h236.966 c10.612,0,19.216-8.604,19.216-19.216c0-12.989,0-103.969,0-114.838C382.795,369.875,403.975,343.389,403.975,312.052z M315.566,473.567H117.032v-15.07h198.534V473.567z M365.543,312.052c0,16.533-13.451,29.985-29.985,29.985h-0.775 c-10.612,0-19.216,8.604-19.216,19.216v58.812H117.032v-58.812c0-10.612-8.604-19.216-19.216-19.216H97.04 c-16.533,0-29.985-13.451-29.985-29.985V203.804c0-7.982,6.494-14.476,14.476-14.476s14.476,6.494,14.476,14.476 c0,10.612,8.604,19.216,19.216,19.216c10.612,0,19.216-8.604,19.216-19.216V86.937c0-7.982,6.494-14.476,14.476-14.476 c7.982,0,14.476,6.494,14.476,14.476v87.593c0,10.612,8.604,19.216,19.216,19.216c10.612,0,19.216-8.604,19.216-19.216V86.937 V52.908c0-7.982,6.494-14.476,14.476-14.476s14.476,6.494,14.476,14.476v34.029v87.593c0,10.612,8.604,19.216,19.216,19.216 c10.614,0,19.216-8.604,19.216-19.216V86.937c0-7.982,6.492-14.476,14.476-14.476c7.981,0,14.476,6.494,14.476,14.476 c0,9.627,0,79.872,0,87.593c0,10.612,8.604,19.216,19.216,19.216c10.612,0,19.216-8.604,19.216-19.216v-53.564 c0-7.982,6.494-14.476,14.476-14.476c7.981,0,14.476,6.494,14.476,14.476V312.052z"/>
                      <path d="M423.843,67.721c-10.612,0-19.216,8.604-19.216,19.216c0,10.612,8.604,19.216,19.216,19.216 c11.636,0,21.102,9.466,21.102,21.1V312.05c0,31.852-15.632,61.86-41.815,80.269c-5.117,3.599-8.163,9.463-8.163,15.72v65.529 h-11.441c-10.612,0-19.216,8.604-19.216,19.216S372.913,512,383.525,512h30.657c10.612,0,19.216-8.604,19.216-19.216V417.55 c31.469-25.849,49.978-64.569,49.978-105.498c0-7.007,0-167.918,0-184.891C483.323,94.377,456.637,67.721,423.843,67.721z"/>
                    </svg>
                  </div>
                  <h2 class="featured-card__title">Перчатки</h2>
                  <p class="featured-card__desc">Финальный штрих твоего образа</p>
                  <div class="featured-card__cta">
                    Выбрать перчатки
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                </div>
                <div class="featured-card__preview">
                  <img v-if="equippedGloveImage" :src="equippedGloveImage" alt="Текущие перчатки" />
                  <div v-else class="featured-card__preview-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weapons by category -->
            <div class="section-head section-head--compact scale-in">
              <div class="section-head__eyebrow">
                <span class="section-head__dot"></span>
                Arsenal
              </div>
              <h2 class="section-head__title section-head__title--sm gradient-text-primary">Оружие по категориям</h2>
            </div>

            <div v-for="(weapons, category) in weaponsByCategory" :key="category" class="category-block">
              <div class="category-head">
                <span class="category-head__dot pulse-glow"></span>
                <span class="category-head__title">{{ tabTitles[category] }}</span>
                <div class="category-head__line"></div>
                <span class="category-head__count">{{ weapons.length }}</span>
              </div>

              <div class="weapons-grid">
                <NuxtLink
                  v-for="(weapon, index) in weapons"
                  :key="weapon.id"
                  :to="`/weapon/${getWeaponSlug(weapon.id)}`"
                  class="weapon-card glass-card stagger-item"
                  :style="{ animationDelay: `${index * 0.03}s` }"
                >
                  <div class="weapon-card__img">
                    <img
                      v-if="getWeaponImage(weapon.id)"
                      :src="getWeaponImage(weapon.id)"
                      :alt="weapon.name"
                      loading="lazy"
                    />
                  </div>
                  <div class="weapon-card__name">{{ weapon.name }}</div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Tab view -->
          <div v-else>
            <div class="section-head scale-in">
              <div>
                <div class="section-head__eyebrow">
                  <button class="back-btn" @click="setActiveTab(null)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                    Назад
                  </button>
                </div>
                <h1 class="section-head__title gradient-text-primary">{{ tabTitles[activeTab] }}</h1>
              </div>

              <TeamToggle v-model="selectedTeam" />
            </div>

            <Transition name="tab-fade" mode="out-in">
              <!-- Knives -->
              <div v-if="activeTab === 'knives'" key="knives">
                <CurrentSkinSection
                  :skin="activeKnifeSkin"
                  :player-skin="activeKnifePlayerSkin"
                  v-model:team="selectedTeam"
                  :show-team-toggle="false"
                  @click="navigateToActiveKnife"
                />

                <div v-if="loading" class="loading-wrap">
                  <div class="loading-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="loading-text">Загрузка арсенала</div>
                </div>
                <div v-else class="arsenal-grid">
                  <NuxtLink
                    v-for="(knife, index) in knifeTypes"
                    :key="knife.weapon_id"
                    :to="`/knife/${getKnifeSlug(knife.weapon_id)}`"
                    class="arsenal-card glass-card stagger-item shimmer-on-hover"
                    :style="{ animationDelay: `${index * 0.04}s` }"
                    @mouseenter="onKnifeHover($event, true)"
                    @mouseleave="onKnifeHover($event, false)"
                  >
                    <div class="arsenal-card__shine scan-line"></div>
                    <div class="arsenal-card__img">
                      <img
                        v-if="getKnifeImage(knife.weapon_id)"
                        :src="getKnifeImage(knife.weapon_id)"
                        :alt="knife.name"
                        class="float-animation-item"
                        loading="lazy"
                      />
                    </div>
                    <div class="arsenal-card__name">{{ knife.name }}</div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Gloves -->
              <div v-else-if="activeTab === 'gloves'" key="gloves">
                <CurrentSkinSection
                  :skin="activeGloveSkin"
                  :player-skin="activeGlovePlayerSkin"
                  v-model:team="selectedTeam"
                  :show-team-toggle="false"
                  @click="navigateToActiveGlove"
                />

                <div v-if="loading" class="loading-wrap">
                  <div class="loading-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="loading-text">Загрузка арсенала</div>
                </div>
                <div v-else class="arsenal-grid">
                  <NuxtLink
                    v-for="(glove, index) in gloveTypes"
                    :key="glove.weapon_id"
                    :to="`/glove/${getGloveSlug(glove.weapon_id)}`"
                    class="arsenal-card glass-card stagger-item shimmer-on-hover"
                    :style="{ animationDelay: `${index * 0.04}s` }"
                    @mouseenter="onGloveHover($event, true)"
                    @mouseleave="onGloveHover($event, false)"
                  >
                    <div class="arsenal-card__shine scan-line"></div>
                    <div class="arsenal-card__img">
                      <img
                        v-if="getGloveImage(glove.weapon_id)"
                        :src="getGloveImage(glove.weapon_id)"
                        :alt="glove.name"
                        class="float-animation-item"
                        loading="lazy"
                      />
                    </div>
                    <div class="arsenal-card__name">{{ glove.name }}</div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Weapons tabs -->
              <div v-else :key="activeTab">
                <div class="arsenal-grid">
                  <NuxtLink
                    v-for="(weapon, index) in weaponsByCategory[activeTab]"
                    :key="weapon.id"
                    :to="`/weapon/${getWeaponSlug(weapon.id)}`"
                    class="arsenal-card glass-card stagger-item"
                    :style="{ animationDelay: `${index * 0.03}s` }"
                  >
                    <div class="arsenal-card__img">
                      <img
                        v-if="getWeaponImage(weapon.id)"
                        :src="getWeaponImage(weapon.id)"
                        :alt="weapon.name"
                        loading="lazy"
                      />
                    </div>
                    <div class="arsenal-card__name">{{ weapon.name }}</div>
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
import { WEAPON_MAP, getWeaponCategory, getDefaultWeaponImage, getWeaponSlug } from '~/utils/weapons'
import { getKnifeSlug } from '~/utils/knives'
import { getGloveSlug } from '~/utils/gloves'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const { user, fetchUser } = useSteamAuth()
const { skins, loading, fetchSkins } = useSkinsData()
const { playerSkins, fetchPlayerSkins } = usePlayerSkins()

const activeTab = ref<string | null>((route.query.tab as string) || null)
const scrolled = ref(false)
const selectedTeam = ref<2 | 3>(3) // 3 = CT (default), 2 = T

const activeKnife = ref<{ knife_t: string | null; knife_ct: string | null }>({ knife_t: null, knife_ct: null })
const activeGloves = ref<{ gloves_t: number | null; gloves_ct: number | null }>({ gloves_t: null, gloves_ct: null })

const tabTitles: Record<string, string> = {
  knives: 'Ножи',
  gloves: 'Перчатки',
  pistols: 'Пистолеты',
  rifles: 'Винтовки',
  smgs: 'Пистолеты-пулемёты',
  snipers: 'Снайперские винтовки',
  heavy: 'Тяжёлое оружие',
}

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(async () => {
  await fetchUser()
  await fetchSkins()
  await fetchPlayerSkins()

  // Fetch active knife and gloves
  if (user.value.steamid) {
    try {
      activeKnife.value = await $fetch('/api/player/active-knife')
      activeGloves.value = await $fetch('/api/player/active-gloves')
    } catch (e) {
      console.error('Failed to fetch active knife/gloves:', e)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const setActiveTab = (tab: string | null) => {
  activeTab.value = tab
  router.push({ query: tab ? { tab } : {} })
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
        name: skin.weapon.name,
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
        name: skin.weapon.name,
      })
    }
  })

  return Array.from(uniqueGloves.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
})

const getKnifeImage = (weaponId: number) => {
  // Use selected team to get the correct knife skin
  const playerSkin = playerSkins.value.find(
    s => s.weapon_defindex === weaponId && s.weapon_team === selectedTeam.value
  )

  if (playerSkin && playerSkin.weapon_paint_id) {
    const selectedSkin = skins.value.find(
      s => s.weapon?.weapon_id === weaponId &&
           parseInt(s.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) return selectedSkin.image
  }

  const knifeSkins = skins.value.filter(s => s.weapon?.weapon_id === weaponId)
  const vanillaSkin = knifeSkins.find(s => !s.name.includes(' | '))
  if (vanillaSkin) return vanillaSkin.image

  const sortedSkins = knifeSkins
    .filter(s => s.paint_index)
    .sort((a, b) => parseInt(a.paint_index) - parseInt(b.paint_index))
  return sortedSkins[0]?.image || ''
}

const getGloveImage = (weaponId: number) => {
  // Use selected team to get the correct glove skin
  const playerSkin = playerSkins.value.find(
    s => s.weapon_defindex === weaponId && s.weapon_team === selectedTeam.value
  )

  if (playerSkin && playerSkin.weapon_paint_id) {
    const selectedSkin = skins.value.find(
      s => s.weapon?.weapon_id === weaponId &&
           parseInt(s.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) return selectedSkin.image
  }

  const gloveSkins = skins.value.filter(s => s.weapon?.weapon_id === weaponId)
  const vanillaSkin = gloveSkins.find(s => !s.name.includes(' | '))
  if (vanillaSkin) return vanillaSkin.image

  const sortedSkins = gloveSkins
    .filter(s => s.paint_index)
    .sort((a, b) => parseInt(a.paint_index) - parseInt(b.paint_index))
  return sortedSkins[0]?.image || ''
}

const equippedKnifeImage = computed(() => {
  // Получить активный нож для выбранной команды
  const activeKnifeName = selectedTeam.value === 2 ? activeKnife.value.knife_t : activeKnife.value.knife_ct
  if (!activeKnifeName) return ''

  // Найти weapon_id по имени ножа
  const KNIFE_MAP: Record<string, number> = {
    'weapon_bayonet': 500,
    'weapon_knife_css': 503,
    'weapon_knife_flip': 505,
    'weapon_knife_gut': 506,
    'weapon_knife_karambit': 507,
    'weapon_knife_m9_bayonet': 508,
    'weapon_knife_tactical': 509,
    'weapon_knife_falchion': 512,
    'weapon_knife_survival_bowie': 514,
    'weapon_knife_butterfly': 515,
    'weapon_knife_push': 516,
    'weapon_knife_cord': 517,
    'weapon_knife_canis': 518,
    'weapon_knife_ursus': 519,
    'weapon_knife_gypsy_jackknife': 520,
    'weapon_knife_outdoor': 521,
    'weapon_knife_stiletto': 522,
    'weapon_knife_widowmaker': 523,
    'weapon_knife_skeleton': 525,
  }
  const weaponDefindex = KNIFE_MAP[activeKnifeName]
  if (!weaponDefindex) return ''

  // Найти скин для этого конкретного ножа и команды
  const knifeSkin = playerSkins.value.find(ps =>
    ps.weapon_defindex === weaponDefindex && ps.weapon_team === selectedTeam.value
  )

  if (!knifeSkin || !knifeSkin.weapon_paint_id) return ''

  // Найти изображение скина
  const skin = skins.value.find(
    s => s.weapon?.weapon_id === weaponDefindex &&
         parseInt(s.paint_index) === knifeSkin.weapon_paint_id
  )
  return skin?.image || ''
})

const equippedGloveImage = computed(() => {
  // Получить активные перчатки для выбранной команды
  const activeGloveDefindex = selectedTeam.value === 2 ? activeGloves.value.gloves_t : activeGloves.value.gloves_ct
  if (!activeGloveDefindex) return ''

  // Найти скин для этих конкретных перчаток и команды
  const gloveSkin = playerSkins.value.find(ps =>
    ps.weapon_defindex === activeGloveDefindex && ps.weapon_team === selectedTeam.value
  )

  if (!gloveSkin || !gloveSkin.weapon_paint_id) return ''

  // Найти изображение скина
  const skin = skins.value.find(
    s => s.weapon?.weapon_id === activeGloveDefindex &&
         parseInt(s.paint_index) === gloveSkin.weapon_paint_id
  )
  return skin?.image || ''
})

// Active knife for CurrentSkinSection in knives tab
const activeKnifePlayerSkin = computed(() => {
  const activeKnifeName = selectedTeam.value === 2 ? activeKnife.value.knife_t : activeKnife.value.knife_ct
  if (!activeKnifeName) return null

  const KNIFE_MAP: Record<string, number> = {
    'weapon_bayonet': 500,
    'weapon_knife_css': 503,
    'weapon_knife_flip': 505,
    'weapon_knife_gut': 506,
    'weapon_knife_karambit': 507,
    'weapon_knife_m9_bayonet': 508,
    'weapon_knife_tactical': 509,
    'weapon_knife_falchion': 512,
    'weapon_knife_survival_bowie': 514,
    'weapon_knife_butterfly': 515,
    'weapon_knife_push': 516,
    'weapon_knife_cord': 517,
    'weapon_knife_canis': 518,
    'weapon_knife_ursus': 519,
    'weapon_knife_gypsy_jackknife': 520,
    'weapon_knife_outdoor': 521,
    'weapon_knife_stiletto': 522,
    'weapon_knife_widowmaker': 523,
    'weapon_knife_skeleton': 525,
  }
  const weaponDefindex = KNIFE_MAP[activeKnifeName]
  if (!weaponDefindex) return null

  return playerSkins.value.find(ps =>
    ps.weapon_defindex === weaponDefindex && ps.weapon_team === selectedTeam.value
  ) || null
})

const activeKnifeSkin = computed(() => {
  if (!activeKnifePlayerSkin.value || !activeKnifePlayerSkin.value.weapon_paint_id) return null

  return skins.value.find(
    s => s.weapon?.weapon_id === activeKnifePlayerSkin.value!.weapon_defindex &&
         parseInt(s.paint_index) === activeKnifePlayerSkin.value!.weapon_paint_id
  ) || null
})

// Active glove for CurrentSkinSection in gloves tab
const activeGlovePlayerSkin = computed(() => {
  const activeGloveDefindex = selectedTeam.value === 2 ? activeGloves.value.gloves_t : activeGloves.value.gloves_ct
  if (!activeGloveDefindex) return null

  return playerSkins.value.find(ps =>
    ps.weapon_defindex === activeGloveDefindex && ps.weapon_team === selectedTeam.value
  ) || null
})

const activeGloveSkin = computed(() => {
  if (!activeGlovePlayerSkin.value || !activeGlovePlayerSkin.value.weapon_paint_id) return null

  return skins.value.find(
    s => s.weapon?.weapon_id === activeGlovePlayerSkin.value!.weapon_defindex &&
         parseInt(s.paint_index) === activeGlovePlayerSkin.value!.weapon_paint_id
  ) || null
})

// Navigation functions
const navigateToActiveKnife = () => {
  const activeKnifeName = selectedTeam.value === 2 ? activeKnife.value.knife_t : activeKnife.value.knife_ct
  if (!activeKnifeName) return

  const KNIFE_MAP: Record<string, number> = {
    'weapon_bayonet': 500,
    'weapon_knife_css': 503,
    'weapon_knife_flip': 505,
    'weapon_knife_gut': 506,
    'weapon_knife_karambit': 507,
    'weapon_knife_m9_bayonet': 508,
    'weapon_knife_tactical': 509,
    'weapon_knife_falchion': 512,
    'weapon_knife_survival_bowie': 514,
    'weapon_knife_butterfly': 515,
    'weapon_knife_push': 516,
    'weapon_knife_cord': 517,
    'weapon_knife_canis': 518,
    'weapon_knife_ursus': 519,
    'weapon_knife_gypsy_jackknife': 520,
    'weapon_knife_outdoor': 521,
    'weapon_knife_stiletto': 522,
    'weapon_knife_widowmaker': 523,
    'weapon_knife_skeleton': 525,
  }
  const weaponDefindex = KNIFE_MAP[activeKnifeName]
  if (weaponDefindex) {
    navigateTo(`/knife/${getKnifeSlug(weaponDefindex)}`)
  }
}

const navigateToActiveGlove = () => {
  const activeGloveDefindex = selectedTeam.value === 2 ? activeGloves.value.gloves_t : activeGloves.value.gloves_ct
  if (activeGloveDefindex) {
    navigateTo(`/glove/${getGloveSlug(activeGloveDefindex)}`)
  }
}

const getWeaponImage = (weaponId: number) => {
  const playerSkin = playerSkins.value.find(
    s => s.weapon_defindex === weaponId && s.weapon_team === selectedTeam.value
  )

  if (playerSkin && playerSkin.weapon_paint_id) {
    const selectedSkin = skins.value.find(
      s => s.weapon?.weapon_id === weaponId &&
           parseInt(s.paint_index) === playerSkin.weapon_paint_id
    )
    if (selectedSkin) return selectedSkin.image
  }

  return getDefaultWeaponImage(weaponId)
}

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
      yoyo: true,
    })
  } else {
    gsap.to(floatItem, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
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
      yoyo: true,
    })
  } else {
    gsap.to(floatItem, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
    })
  }
}
</script>

<style scoped>
/* ============================================ */
/* STICKY GLASS NAVBAR                          */
/* ============================================ */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 15, 31, 0.55);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.site-nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), rgba(99, 102, 241, 0.3), transparent);
  opacity: 0.7;
}

.site-nav--scrolled {
  background: rgba(10, 15, 31, 0.8);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.6);
}

.site-nav__inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  position: relative;
  z-index: 1;
}

.site-nav__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1.5rem;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}

.brand__mark {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  overflow: hidden;
}

.brand__mark-inner {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 1;
}

.brand__mark-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 60%);
  animation: orb-drift 5s ease-in-out infinite;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand__title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand__sub {
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-top: 2px;
}

/* Nav Tabs */
.nav-tabs {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.nav-tabs__sep {
  width: 1px;
  height: 22px;
  margin: 0 0.4rem;
  background: linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.35), transparent);
}

.nav-tab {
  position: relative;
  padding: 0.55rem 1.15rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(229, 231, 235, 0.65);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.nav-tab::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(99, 102, 241, 0.12));
  opacity: 0;
  transition: opacity 0.35s;
}

.nav-tab__text {
  position: relative;
  z-index: 1;
}

.nav-tab:hover {
  color: #fff;
  border-color: rgba(96, 165, 250, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.nav-tab:hover::before {
  opacity: 1;
}

.nav-tab--active {
  color: #fff;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(99, 102, 241, 0.2));
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow:
    0 8px 24px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.nav-tab--active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #60A5FA, #818CF8);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.8);
}

/* ============================================ */
/* MAIN WRAP                                    */
/* ============================================ */
.main-wrap {
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
  position: relative;
  z-index: 1;
}

/* ============================================ */
/* HERO                                         */
/* ============================================ */
.hero {
  position: relative;
  text-align: center;
  padding: 5rem 1rem 6rem;
  isolation: isolate;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: -1;
  animation: orb-drift 14s ease-in-out infinite;
}

.hero-orb--1 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%);
  top: -120px;
  left: 15%;
}

.hero-orb--2 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%);
  top: 80px;
  right: 10%;
  animation-delay: -5s;
}

.hero-orb--3 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.18), transparent 70%);
  bottom: -80px;
  left: 50%;
  animation-delay: -9s;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(96, 165, 250, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60A5FA;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.9);
  animation: pulse-glow 2s ease-in-out infinite;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.75rem;
}

.hero__subtitle {
  max-width: 580px;
  margin: 0 auto 2.5rem;
  font-size: 1.075rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.hero__cta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero__stats {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  padding: 1.25rem 2.25rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.5);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat__value {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60A5FA, #818CF8);
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat__label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.stat--div {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.15), transparent);
}

/* ============================================ */
/* SECTION HEAD                                 */
/* ============================================ */
.section-head {
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.section-head--compact {
  margin-top: 5rem;
  margin-bottom: 2rem;
}

.section-head__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-glow);
  margin-bottom: 1rem;
}

.section-head__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60A5FA;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
}

.section-head__title {
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.section-head__title--sm {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
}

.section-head__sub {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.45rem 0.85rem;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.25s ease;
}

.back-btn svg {
  width: 14px;
  height: 14px;
}

.back-btn:hover {
  color: #fff;
  border-color: rgba(96, 165, 250, 0.4);
  background: rgba(59, 130, 246, 0.12);
}

/* ============================================ */
/* FEATURED CARDS (Knives / Gloves)             */
/* ============================================ */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.featured-card {
  position: relative;
  padding: 2.5rem;
  cursor: pointer;
  isolation: isolate;
  min-height: 240px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: center;
}

.featured-card__shine {
  opacity: 0;
  transition: opacity 0.4s;
}

.featured-card:hover .featured-card__shine {
  opacity: 1;
}

.featured-card__content {
  position: relative;
  z-index: 2;
}

.featured-card__preview {
  position: relative;
  z-index: 2;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.05));
  border: 2px solid rgba(96, 165, 250, 0.2);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-t .featured-card__preview {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.05));
  border-color: rgba(251, 191, 36, 0.2);
}

.featured-card__preview img {
  width: 85%;
  height: 85%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s;
}

.team-t .featured-card__preview img {
  filter: drop-shadow(0 4px 12px rgba(251, 191, 36, 0.3));
}

.featured-card:hover .featured-card__preview img {
  transform: scale(1.1);
}

.featured-card__preview-empty {
  width: 48px;
  height: 48px;
  color: rgba(96, 165, 250, 0.25);
  transition: color 0.3s;
}

.team-t .featured-card__preview-empty {
  color: rgba(251, 191, 36, 0.25);
}

.featured-card__preview-empty svg {
  width: 100%;
  height: 100%;
}

.featured-card:hover .featured-card__preview {
  border-color: rgba(96, 165, 250, 0.4);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.08));
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.team-t .featured-card:hover .featured-card__preview {
  border-color: rgba(251, 191, 36, 0.4);
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(245, 158, 11, 0.08));
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.2);
}

.featured-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15));
  border: 1px solid rgba(96, 165, 250, 0.3);
  color: #60A5FA;
  margin-bottom: 1.25rem;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-t .featured-card__icon {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15));
  border-color: rgba(251, 191, 36, 0.3);
  color: #FCD34D;
}

.featured-card__icon svg {
  width: 28px;
  height: 28px;
}

.featured-card:hover .featured-card__icon {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(129, 140, 248, 0.25));
  border-color: rgba(96, 165, 250, 0.55);
  color: #fff;
  transform: scale(1.08) rotate(-3deg);
  box-shadow: 0 10px 32px rgba(59, 130, 246, 0.4);
}

.team-t .featured-card:hover .featured-card__icon {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.25));
  border-color: rgba(251, 191, 36, 0.55);
  box-shadow: 0 10px 32px rgba(251, 191, 36, 0.4);
}

.featured-card__title {
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.4rem;
  color: #fff;
}

.featured-card__desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.featured-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent-glow);
  transition: gap 0.3s, color 0.3s;
}

.team-t .featured-card__cta {
  color: #FCD34D;
}

.featured-card__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
}

.featured-card:hover .featured-card__cta {
  gap: 0.85rem;
}

.featured-card:hover .featured-card__cta svg {
  transform: translateX(3px);
}

/* ============================================ */
/* CATEGORY BLOCK                               */
/* ============================================ */
.category-block {
  margin-bottom: 3.5rem;
}

.category-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.category-head__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #60A5FA;
  transition: background 0.3s;
}

.team-t .category-head__dot {
  background: #FCD34D;
}

.category-head__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}

.category-head__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(96, 165, 250, 0.35), transparent);
  transition: background 0.3s;
}

.team-t .category-head__line {
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.35), transparent);
}

.section-head__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-glow);
  margin-bottom: 0.75rem;
  transition: color 0.3s;
}

.team-t .section-head__eyebrow {
  color: #FCD34D;
}

.section-head__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-glow);
  box-shadow: 0 0 8px var(--color-accent-glow);
  animation: pulse-glow 2s ease-in-out infinite;
  transition: background 0.3s, box-shadow 0.3s;
}

.team-t .section-head__dot {
  background: #FCD34D;
  box-shadow: 0 0 8px #FCD34D;
}

.category-head__count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-muted);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ============================================ */
/* WEAPON GRID                                  */
/* ============================================ */
.weapons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.weapon-card {
  padding: 1.25rem 1rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
}

.weapon-card__img {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weapon-card__img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.5));
}

.weapon-card:hover .weapon-card__img img {
  transform: scale(1.08) translateY(-2px);
}

.weapon-card__name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-align: center;
  letter-spacing: 0.02em;
  transition: color 0.3s;
}

.weapon-card:hover .weapon-card__name {
  color: #fff;
}

/* ============================================ */
/* ARSENAL GRID (tab view)                      */
/* ============================================ */
.arsenal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.25rem;
}

.arsenal-card {
  position: relative;
  padding: 1.75rem 1.25rem 1.5rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  isolation: isolate;
}

.arsenal-card__shine {
  opacity: 0;
  transition: opacity 0.4s;
}

.arsenal-card:hover .arsenal-card__shine {
  opacity: 1;
}

.arsenal-card__img {
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.arsenal-card__img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.6));
}

.arsenal-card__name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
}

/* ============================================ */
/* LOADING                                      */
/* ============================================ */
.loading-wrap {
  text-align: center;
  padding: 6rem 0;
}

.loading-dots {
  display: inline-flex;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #60A5FA;
  animation: loading-bounce 1.2s ease-in-out infinite;
  box-shadow: 0 0 14px rgba(96, 165, 250, 0.8);
}

.loading-dots span:nth-child(2) { animation-delay: 0.15s; }
.loading-dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes loading-bounce {
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
  40%            { transform: scale(1);   opacity: 1; }
}

.loading-text {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ============================================ */
/* TAB TRANSITION                               */
/* ============================================ */
.tab-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ============================================ */
/* RESPONSIVE                                   */
/* ============================================ */
@media (max-width: 768px) {
  .site-nav__inner { padding: 0.85rem 1rem; }
  .site-nav__row { margin-bottom: 0.75rem; }
  .brand__mark { width: 38px; height: 38px; }
  .brand__title { font-size: 1.1rem; }
  .brand__sub { display: none; }

  .nav-tabs { gap: 0.35rem; overflow-x: auto; flex-wrap: nowrap; }
  .nav-tab { padding: 0.5rem 0.85rem; font-size: 0.72rem; }
  .nav-tabs__sep { display: none; }

  .main-wrap { padding: 2.5rem 1rem 4rem; }

  .hero { padding: 3rem 0.5rem 4rem; }
  .hero__cta { flex-direction: column; }
  .hero__stats { gap: 1.25rem; padding: 1rem 1.5rem; }
  .stat__value { font-size: 1.4rem; }

  .featured-grid { grid-template-columns: 1fr; gap: 1rem; }
  .featured-card { padding: 1.75rem; min-height: auto; }

  .weapons-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .arsenal-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
}
</style>
