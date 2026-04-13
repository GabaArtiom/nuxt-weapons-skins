<template>
  <div
    class="min-h-screen tactical-grid-bg"
    style="background-color: var(--color-tactical-dark)"
  >
    <PageLoader />

    <header
      style="
        background-color: var(--color-tactical-surface);
        border-bottom: 1px solid var(--color-tactical-border);
      "
    >
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <NuxtLink
          to="/"
          class="text-2xl font-bold tracking-wider"
          style="
            color: var(--color-accent-primary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
          "
        >
          CS2 WeaponPaints
        </NuxtLink>
        <ClientOnly>
          <SteamLoginBtn />
        </ClientOnly>
      </div>
    </header>

    <main class="mx-auto px-4 py-8" style="max-width: 1600px">
      <div class="mb-6">
        <NuxtLink
          to="/?tab=gloves"
          class="hover:underline"
          style="color: var(--color-accent-primary)"
          >&larr; Назад к перчаткам</NuxtLink
        >
      </div>

      <h1
        class="text-3xl font-bold mb-2 tracking-wide"
        style="text-transform: uppercase; letter-spacing: 0.05em"
      >
        {{ gloveName }}
      </h1>
      <p class="mb-8" style="color: var(--color-tactical-muted)">
        Выберите скин для этих перчаток
      </p>

      <div class="mb-8">
        <SkinFilter
          v-model:search="searchQuery"
          v-model:rarity="selectedRarity"
          v-model:stattrak="showStatTrak"
        />
      </div>

      <ClientOnly>
        <div v-if="loading" class="text-center py-20">
          <div style="color: var(--color-tactical-muted)">
            Загрузка скинов...
          </div>
        </div>

        <div v-else-if="filteredSkins.length === 0" class="text-center py-20">
          <div style="color: var(--color-tactical-muted)">Скины не найдены</div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <div
            v-for="(skin, index) in filteredSkins"
            :key="skin.id"
            class="stagger-item"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <SkinCard :skin="skin" @select="openSkinModal" />
          </div>
        </div>

        <!-- Skin Configuration Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center z-50"
          style="background-color: rgba(0, 0, 0, 0.8)"
          @click.self="showModal = false"
        >
          <div
            class="rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
            style="
              background-color: var(--color-tactical-elevated);
              border: 1px solid var(--color-tactical-border);
            "
          >
            <div class="scan-line"></div>
            <div v-if="selectedSkin">
              <h2
                class="text-2xl font-bold mb-4 tracking-wide"
                style="text-transform: uppercase; letter-spacing: 0.05em"
              >
                {{ selectedSkin.name }}
              </h2>

              <div class="mb-6 relative">
                <img
                  :src="selectedSkin.image"
                  :alt="selectedSkin.name"
                  class="w-full rounded-lg"
                  style="
                    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.7))
                      drop-shadow(0 3px 8px rgba(0, 0, 0, 0.5));
                  "
                />
                <div
                  class="corner-brackets"
                  :style="{ color: selectedSkin.rarity.color }"
                ></div>
              </div>

              <div class="space-y-6">
                <FloatSlider
                  v-model="floatValue"
                  :min="selectedSkin.min_float"
                  :max="selectedSkin.max_float"
                />

                <div>
                  <label
                    class="text-sm font-medium mb-2 block tracking-wide"
                    style="
                      color: var(--color-tactical-muted);
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-size: 1rem;
                    "
                  >
                    Seed (Pattern): {{ seedValue }}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    v-model.number="seedValue"
                    class="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style="background-color: var(--color-tactical-surface)"
                  />
                </div>

                <div>
                  <label
                    class="text-sm font-medium mb-2 block tracking-wide"
                    style="
                      color: var(--color-tactical-muted);
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-size: 0.875rem;
                    "
                  >
                    Nametag
                  </label>
                  <input
                    v-model="nametag"
                    placeholder="Введите название..."
                    class="w-full px-4 py-3 rounded-lg text-white"
                    style="
                      background-color: var(--color-tactical-surface);
                      border: 1px solid var(--color-tactical-border);
                      font-size: 1rem;
                    "
                  />
                </div>

                <div class="flex gap-2">
                  <button
                    @click="saveSkinConfig(2)"
                    :disabled="saving"
                    class="flex-1 px-5 py-3 rounded-lg disabled:opacity-50 font-medium tracking-wide transition-all glow-effect"
                    style="
                      background-color: #d97706;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-size: 1rem;
                    "
                  >
                    {{ saving === 2 ? "Сохранение..." : "Сохранить для T" }}
                  </button>
                  <button
                    @click="saveSkinConfig(3)"
                    :disabled="saving"
                    class="flex-1 px-5 py-3 rounded-lg disabled:opacity-50 font-medium tracking-wide transition-all glow-effect"
                    style="
                      background-color: #2563eb;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-size: 1rem;
                    "
                  >
                    {{ saving === 3 ? "Сохранение..." : "Сохранить для CT" }}
                  </button>
                </div>

                <div class="flex justify-center">
                  <button
                    @click="showModal = false"
                    class="px-8 py-3 rounded-lg font-medium tracking-wide transition-all"
                    style="
                      background-color: var(--color-tactical-surface);
                      border: 1px solid var(--color-tactical-border);
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-size: 1rem;
                    "
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Skin } from "~/utils/skins";

const route = useRoute();
const gloveId = computed(() => parseInt(route.params.id as string));

const { skins, loading, fetchSkins } = useSkinsData();
const { saveSkin } = usePlayerSkins();

const searchQuery = ref("");
const selectedRarity = ref<string | null>(null);
const showStatTrak = ref(false);

const showModal = ref(false);
const selectedSkin = ref<Skin | null>(null);
const floatValue = ref(0.01);
const seedValue = ref(0);
const nametag = ref("");
const saving = ref<number | false>(false);

onMounted(async () => {
  await fetchSkins();
});

const gloveSkins = computed(() => {
  return skins.value.filter(
    (skin) =>
      skin.weapon?.weapon_id === gloveId.value &&
      skin.category?.id === "sfui_invpanel_filter_gloves",
  );
});

const gloveName = computed(() => {
  const firstSkin = gloveSkins.value[0];
  return firstSkin?.weapon?.name || "Перчатки";
});

const rarityOrder: Record<string, number> = {
  "Consumer Grade": 1,
  "Industrial Grade": 2,
  "Mil-Spec Grade": 3,
  Restricted: 4,
  Classified: 5,
  Covert: 6,
  Contraband: 7,
};

const filteredSkins = computed(() => {
  let result = gloveSkins.value;

  if (searchQuery.value) {
    result = result.filter((skin) =>
      skin.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  if (selectedRarity.value) {
    result = result.filter((skin) => skin.rarity.name === selectedRarity.value);
  }

  if (showStatTrak.value) {
    result = result.filter((skin) => skin.stattrak);
  }

  // Всегда сортируем по редкости от лучшего к худшему
  result = [...result].sort((a, b) => {
    const orderA = rarityOrder[a.rarity.name] || 0;
    const orderB = rarityOrder[b.rarity.name] || 0;
    return orderB - orderA;
  });

  return result;
});

const openSkinModal = (skin: Skin) => {
  selectedSkin.value = skin;
  floatValue.value = skin.min_float;
  seedValue.value = 0;
  nametag.value = "";
  showModal.value = true;
};

const saveSkinConfig = async (team: number) => {
  if (!selectedSkin.value) return;

  saving.value = team;
  try {
    await saveSkin({
      weapon_defindex: gloveId.value,
      weapon_paint_id: parseInt(selectedSkin.value.paint_index),
      weapon_wear: floatValue.value,
      weapon_seed: seedValue.value,
      weapon_nametag: nametag.value || null,
      weapon_stattrak: false,
      weapon_team: team,
    });
  } finally {
    saving.value = false;
  }
};
</script>
