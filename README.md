# CS2 WeaponPaints Website

Сайт для выбора скинов оружия в CS2, работающий с плагином [cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints).

## Стек

- **Nuxt 4** — фреймворк
- **Vue 3** — UI
- **Nuxt UI v3** — компоненты
- **Tailwind CSS v4** — стили
- **MySQL** — база данных (общая с плагином)
- **Steam OpenID** — авторизация

## Установка

```bash
# Установить зависимости
npm install

# Настроить .env файл
cp .env.example .env
# Отредактировать .env с вашими данными MySQL и Steam API Key

# Запустить dev сервер
npm run dev
```

## Структура проекта

```
app/
├── pages/           # Страницы (index, weapon/[id], knives, gloves, agents)
├── components/      # UI компоненты (SkinCard, SkinFilter, FloatSlider, etc)
└── composables/     # Composables (useSteamAuth, useSkinsData, usePlayerSkins)

shared/
├── types/           # TypeScript типы
└── utils/           # Утилиты (weapons mapping)

server/
├── api/
│   ├── auth/        # Steam авторизация
│   ├── csgo/        # CSGO-API прокси с кешем
│   └── skins/       # Работа с БД скинов
└── utils/
    └── db.ts        # MySQL подключение
```

## Функционал

✅ Steam авторизация  
✅ Список оружий по категориям  
✅ Выбор скинов с фильтрами  
✅ Настройка float, seed, nametag, StatTrak  
✅ Выбор команды (T/CT/Обе)  
✅ Сохранение в MySQL  
✅ Интеграция с CSGO-API  
✅ Страница агентов  
🚧 Ножи (в разработке)  
🚧 Перчатки (в разработке)  

## База данных

Сайт работает с таблицей `wp_player_skins` которую создаёт плагин WeaponPaints.
Убедитесь что у вас настроены правильные креды в `.env`.

## Разработка

```bash
npm run dev          # Dev сервер на http://localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```
# nuxt-weapons-skins
