# 🎨 WeaponPaints Website — Гайд по разработке

> Документ для разработки своего сайта смены скинов, совместимого с плагином [cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints).
> Стек основан на **Nuxt 4** (стабильный релиз — июль 2025).

---

## 📐 Как это работает (архитектура)

```
Игрок пишет !ws в CS2
        ↓
Плагин отправляет его на твой сайт
        ↓
Игрок логинится через Steam
        ↓
Выбирает скин → сохраняется в MySQL
        ↓
Игрок пишет !wp в игре
        ↓
Плагин читает из MySQL → применяет скин
```

**Ключевой момент:** плагин и сайт работают с **одной и той же базой данных MySQL**.
Сайт только пишет данные — плагин их читает. Никакого прямого общения между ними нет.

---

## 🧱 Стек технологий

### Frontend — Nuxt 4 + Vue 3
| Технология | Версия | Зачем |
|---|---|---|
| **Nuxt 4** | 4.x (stable) | Фреймворк — роутинг, SSR, server routes, структура проекта |
| **Vue 3** | 3.x | Реактивный UI — списки скинов, фильтры, превью |
| **Nuxt UI v3** | 3.x | Готовые компоненты (кнопки, модалки, инпуты) на базе Tailwind |
| **Tailwind CSS v4** | 4.x | Стилизация — встроен в Nuxt UI v3 |
| **Pinia** | latest | Хранилище состояния (выбранные скины, данные юзера) |

### Backend — встроен в Nuxt 4 (через `server/`)
| Технология | Зачем |
|---|---|
| **Nuxt Server Routes** | API прямо внутри проекта, отдельный бэкенд не нужен |
| **h3** | HTTP-фреймворк под капотом Nuxt (встроен, не устанавливается отдельно) |
| **mysql2** | Подключение к MySQL базе данных WeaponPaints |
| **openid-client** | Steam авторизация через OpenID 2.0 |

### База данных
| Технология | Зачем |
|---|---|
| **MySQL 8+** | Та же БД что использует плагин WeaponPaints |

### Данные о скинах
| Источник | Зачем |
|---|---|
| **[ByMykel/CSGO-API](https://github.com/ByMykel/CSGO-API)** | Публичный JSON с актуальными скинами, изображениями, paint_index — обновляется автоматически при каждом апдейте CS2 |

---

## ⚠️ Что изменилось в Nuxt 4 — ВАЖНО ПРОЧИТАТЬ ДОКИ

Nuxt 4 вышел стабильно в июле 2025. Он совместим с Nuxt 3, но имеет важные отличия.
**Перед началом разработки обязательно прочитай:**

- 📘 **Официальный анонс Nuxt 4:** https://nuxt.com/blog/v4
- 📗 **Гайд по обновлению (breaking changes):** https://nuxt.com/docs/getting-started/upgrade
- 📙 **Документация Nuxt 4:** https://nuxt.com/docs

### Главные изменения которые тебя затронут:

**1. Новая структура папок — `app/` директория**

В Nuxt 4 весь код приложения живёт внутри папки `app/`.
Это самое заметное изменение — не перепутай со старой структурой из туториалов по Nuxt 3.

```
# Nuxt 3 (старая структура)          # Nuxt 4 (новая структура)
my-project/                           my-project/
├── pages/                            ├── app/
├── components/                       │   ├── pages/
├── composables/                      │   ├── components/
├── layouts/                          │   ├── composables/
├── middleware/                       │   ├── layouts/
├── app.vue                           │   ├── middleware/
├── server/                           │   └── app.vue
└── nuxt.config.ts                    ├── shared/        ← новая папка
                                      ├── server/
                                      └── nuxt.config.ts
```

> ⚠️ Большинство туториалов и примеров в интернете написаны под Nuxt 3.
> Структура папок там будет другой — адаптируй под `app/`.

**2. Новая папка `shared/`**

Код который используется и на клиенте и на сервере теперь кладётся в `shared/utils/` и `shared/types/`.
Например — TypeScript типы для скинов.

**3. `useFetch` и `useAsyncData` — изменение реактивности**

По умолчанию возвращаемый `data` теперь **не глубоко реактивен** (shallow ref).
Если тебе нужна глубокая реактивность:
```ts
// явно включить для конкретного запроса
const { data } = useFetch('/api/skins', { deep: true })
```

**4. Требования к Node.js**

Nuxt 4 требует **Node.js 18.20 или выше**. Проверь версию перед стартом:
```bash
node --version
```

**5. Если видишь туториал по Nuxt 3 — проверь совместимость**

Почти всё работает одинаково, но структура папок и некоторые дефолты изменились.
При сомнениях — лезь в официальную документацию https://nuxt.com/docs

---

## 📦 Структура базы данных WeaponPaints

Плагин создаёт таблицу `wp_player_skins`. Именно с ней работает сайт:

```sql
CREATE TABLE `wp_player_skins` (
  `steamid`               VARCHAR(64)   NOT NULL,
  `weapon_defindex`       INT           NOT NULL,   -- ID оружия (1 = Desert Eagle и т.д.)
  `weapon_paint_id`       INT           DEFAULT NULL, -- paint_index из CSGO-API
  `weapon_wear`           FLOAT         DEFAULT NULL, -- флоат (0.0 - 1.0)
  `weapon_seed`           INT           DEFAULT NULL, -- паттерн (0-1000)
  `weapon_nametag`        VARCHAR(255)  DEFAULT NULL,
  `weapon_stattrak`       TINYINT(1)    DEFAULT 0,
  `weapon_stattrak_count` INT           DEFAULT NULL,
  `weapon_team`           INT           DEFAULT 0,   -- 0 = оба, 2 = T, 3 = CT
  PRIMARY KEY (`steamid`, `weapon_defindex`, `weapon_team`)
);
```

---

## 🌐 Данные о скинах — ByMykel CSGO-API

Бесплатный публичный JSON API, который **автоматически обновляется** при каждом обновлении CS2.
Не нужно ничего хранить у себя — просто делаешь fetch.

### Основные эндпоинты

```
# Все скины (сгруппированные)
GET https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json

# Агенты
GET https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/agents.json

# Стикеры
GET https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/stickers.json

# Keychains (брелоки)
GET https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keychains.json

# Все предметы сразу (один большой файл)
GET https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/all.json
```

### Пример объекта скина
```json
{
  "id": "skin-65604",
  "name": "Desert Eagle | Urban DDPAT",
  "weapon": {
    "id": "weapon_deagle",
    "weapon_id": 1
  },
  "paint_index": "17",
  "min_float": 0.06,
  "max_float": 0.8,
  "stattrak": false,
  "rarity": {
    "name": "Industrial Grade",
    "color": "#5e98d9"
  },
  "image": "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/..."
}
```

> **`paint_index`** → записывается в БД как `weapon_paint_id`
> **`weapon.weapon_id`** → записывается в БД как `weapon_defindex`

### Кеширование в Nuxt 4 (правильный способ)

Не делай fetch к GitHub при каждом запросе пользователя — кешируй на сервере:

```ts
// server/api/csgo/skins.get.ts
export default defineCachedEventHandler(async () => {
  const data = await $fetch(
    'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json'
  )
  return data
}, {
  maxAge: 60 * 60 * 6, // кеш на 6 часов
  name: 'csgo-skins',
})
```

---

## 🔐 Steam авторизация

Плагин WeaponPaints хранит данные по **SteamID64** — именно его ты получаешь после Steam логина.

### Установка
```bash
npm install openid-client
```

### Как работает Steam OpenID

1. Пользователь нажимает "Войти через Steam"
2. Ты редиректишь его на `https://steamcommunity.com/openid/login?...`
3. Steam редиректит его обратно с параметрами в URL
4. Ты верифицируешь ответ и получаешь SteamID64
5. Сохраняешь SteamID64 в cookie-сессию

```ts
// server/api/auth/steam.get.ts
export default defineEventHandler(async (event) => {
  const returnUrl = `${process.env.SITE_URL}/api/auth/callback`
  const steamUrl =
    `https://steamcommunity.com/openid/login` +
    `?openid.ns=http://specs.openid.net/auth/2.0` +
    `&openid.mode=checkid_setup` +
    `&openid.return_to=${encodeURIComponent(returnUrl)}` +
    `&openid.realm=${encodeURIComponent(process.env.SITE_URL!)}` +
    `&openid.identity=http://specs.openid.net/auth/2.0/identifier_select` +
    `&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`

  await sendRedirect(event, steamUrl)
})
```

```ts
// server/api/auth/callback.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const claimedId = query['openid.claimed_id']?.toString() ?? ''
  const steamId = claimedId.split('/').pop()

  if (!steamId) throw createError({ statusCode: 400, message: 'Invalid Steam response' })

  setCookie(event, 'steamid', steamId, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    sameSite: 'lax',
  })

  await sendRedirect(event, '/')
})
```

---

## 🗄️ Подключение к MySQL

```bash
npm install mysql2
```

```ts
// server/utils/db.ts
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
})
```

### Получить скины игрока

```ts
// server/api/skins/[steamid].get.ts
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const steamid = getRouterParam(event, 'steamid')

  const [rows] = await db.execute(
    'SELECT * FROM wp_player_skins WHERE steamid = ?',
    [steamid]
  )

  return rows
})
```

### Сохранить скин

```ts
// server/api/skins/save.post.ts
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const steamid = getCookie(event, 'steamid')
  if (!steamid) throw createError({ statusCode: 401, message: 'Not authenticated' })

  const body = await readBody(event)
  const { weapon_defindex, weapon_paint_id, weapon_wear, weapon_seed, weapon_team } = body

  await db.execute(`
    INSERT INTO wp_player_skins
      (steamid, weapon_defindex, weapon_paint_id, weapon_wear, weapon_seed, weapon_team)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      weapon_paint_id = VALUES(weapon_paint_id),
      weapon_wear     = VALUES(weapon_wear),
      weapon_seed     = VALUES(weapon_seed)
  `, [steamid, weapon_defindex, weapon_paint_id, weapon_wear, weapon_seed, weapon_team ?? 0])

  return { success: true }
})
```

---

## 📁 Структура проекта (Nuxt 4)

```
weaponpaints-site/
│
├── app/                          ← весь код приложения (новое в Nuxt 4)
│   ├── pages/
│   │   ├── index.vue             # Главная — список оружий
│   │   ├── weapon/[id].vue       # Выбор скина для оружия
│   │   ├── knife.vue             # Выбор ножа
│   │   └── gloves.vue            # Выбор перчаток
│   │
│   ├── components/
│   │   ├── SkinCard.vue          # Карточка скина с изображением
│   │   ├── SkinFilter.vue        # Фильтр по редкости/оружию/поиску
│   │   ├── FloatSlider.vue       # Слайдер флоата
│   │   └── SteamLoginBtn.vue     # Кнопка входа через Steam
│   │
│   ├── composables/
│   │   ├── useSkinsData.ts       # Загрузка данных из CSGO-API
│   │   ├── usePlayerSkins.ts     # Текущие скины игрока
│   │   └── useSteamAuth.ts       # Состояние авторизации
│   │
│   └── app.vue                   # Корневой компонент
│
├── shared/                       ← новое в Nuxt 4 (общий код для клиента и сервера)
│   ├── types/
│   │   └── skins.ts              # TypeScript типы: Skin, PlayerSkin и т.д.
│   └── utils/
│       └── weapons.ts            # Утилиты (маппинг weapon_id → название)
│
├── server/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── steam.get.ts      # Редирект на Steam
│   │   │   └── callback.get.ts   # Обработка ответа Steam
│   │   ├── csgo/
│   │   │   └── skins.get.ts      # Кеш скинов из ByMykel API
│   │   └── skins/
│   │       ├── [steamid].get.ts  # Получить скины игрока
│   │       └── save.post.ts      # Сохранить скин
│   └── utils/
│       └── db.ts                 # Подключение к MySQL
│
├── public/                       # Статика (иконки, фавикон)
├── .env                          # Переменные окружения
└── nuxt.config.ts
```

---

## ⚙️ Переменные окружения (.env)

```env
# База данных WeaponPaints (та же что у плагина на сервере)
DB_HOST=localhost
DB_USER=cs2user
DB_PASSWORD=yourpassword
DB_NAME=cs2db

# URL твоего сайта (нужен для Steam OpenID callback)
SITE_URL=https://skins.yourdomain.com
```

---

## 🚀 Установка и запуск

### 1. Создать проект Nuxt 4

```bash
npx nuxi@latest init weaponpaints-site
cd weaponpaints-site
```

### 2. Установить зависимости

```bash
npm install mysql2 openid-client
npm install @nuxt/ui pinia @pinia/nuxt
```

### 3. nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],

  runtimeConfig: {
    // Только сервер видит эти переменные
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    // Клиент + сервер
    public: {
      siteUrl: process.env.SITE_URL,
    },
  },

  future: {
    compatibilityVersion: 4, // включает всё поведение Nuxt 4
  },
})
```

### 4. Запуск для разработки

```bash
npm run dev
```

---

## 📋 Чеклист функций сайта

### Минимум (MVP)
- [ ] Steam логин / логаут
- [ ] Список оружий с категориями
- [ ] Выбор скина для оружия
- [ ] Сохранение в БД
- [ ] Превью изображения скина

### Расширенный функционал
- [ ] Поиск и фильтрация по редкости / оружию
- [ ] Слайдер флоата (wear) с min/max из API
- [ ] StatTrak переключатель
- [ ] Nametag (ввод текста)
- [ ] Выбор команды (T / CT / Обе)
- [ ] Выбор ножа
- [ ] Выбор перчаток
- [ ] Выбор агента
- [ ] Стикеры на оружие
- [ ] Keychains (брелоки)

---

## 📚 Что и в каком порядке изучать

### Для новичка — по шагам:

1. **HTML + CSS basics**
   - Сайт: https://www.w3schools.com/html/ и https://www.w3schools.com/css/
   - Время: 1–2 недели

2. **JavaScript основы**
   - Сайт: https://javascript.info (лучший ресурс, есть на русском: https://learn.javascript.ru)
   - Время: 2–3 недели

3. **Vue 3 основы**
   - Официальный туториал: https://vuejs.org/tutorial/
   - Документация: https://vuejs.org/guide/introduction
   - Время: 1–2 недели

4. **Nuxt 4** ← читай именно v4 документацию, не v3!
   - Введение: https://nuxt.com/docs/getting-started/introduction
   - **Структура папок Nuxt 4:** https://nuxt.com/docs/guide/directory-structure/app
   - **Server routes:** https://nuxt.com/docs/guide/directory-structure/server
   - **useFetch / useAsyncData:** https://nuxt.com/docs/getting-started/data-fetching
   - Время: 1–2 недели

5. **MySQL основы**
   - Сайт: https://www.w3schools.com/mysql/
   - Время: 3–5 дней

6. **Сборка проекта** — постепенно, с этим документом как ориентиром

> 💡 Не жди пока пройдёшь всё — начни с Vue 3, запусти Nuxt проект параллельно и учись по ходу.

---

## 🔗 Все важные ссылки

| Ресурс | Ссылка |
|---|---|
| WeaponPaints плагин | https://github.com/Nereziel/cs2-WeaponPaints |
| CSGO-API (скины, изображения) | https://github.com/ByMykel/CSGO-API |
| **Nuxt 4 документация** | https://nuxt.com/docs |
| **Nuxt 4 анонс** | https://nuxt.com/blog/v4 |
| **Nuxt 4 breaking changes** | https://nuxt.com/docs/getting-started/upgrade |
| Vue 3 документация | https://vuejs.org/guide/introduction |
| Nuxt UI v3 компоненты | https://ui.nuxt.com |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| Pinia документация | https://pinia.vuejs.org |
| javascript.info (на русском) | https://learn.javascript.ru |
| Референс сайт (LielXD) | https://github.com/LielXD/CS2-WeaponPaints-Website |
