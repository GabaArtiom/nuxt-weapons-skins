# 🚀 Быстрый старт

## Что уже сделано

✅ Nuxt 4 проект инициализирован  
✅ Все зависимости установлены  
✅ Структура папок настроена (app/, server/, shared/)  
✅ Steam авторизация реализована  
✅ API эндпоинты для работы с БД  
✅ Интеграция с CSGO-API (скины, агенты, стикеры)  
✅ UI компоненты (SkinCard, SkinFilter, FloatSlider)  
✅ Страницы: главная, выбор оружия, агенты  
✅ Функционал: фильтры, float, seed, nametag, StatTrak, выбор команды  

## Что нужно сделать перед запуском

### 1. Настроить базу данных

Отредактируй файл `.env` и укажи данные подключения к MySQL:

```bash
nano .env
```

Замени значения на свои:
```env
DB_HOST=localhost          # IP адрес MySQL сервера
DB_USER=cs2user           # Пользователь БД
DB_PASSWORD=yourpassword  # Пароль
DB_NAME=cs2db             # Название базы данных
SITE_URL=http://localhost:3000
STEAM_API_KEY=            # Получить на https://steamcommunity.com/dev/apikey
```

> 💡 Эти данные должны совпадать с конфигом плагина WeaponPaints на твоём CS2 сервере.
> Подробнее читай в `DATABASE.md`

### 1.5. Получить Steam API Key (опционально, но рекомендуется)

Steam API Key нужен для отображения никнейма и аватара пользователя.

1. Открой https://steamcommunity.com/dev/apikey
2. Войди в Steam
3. Укажи домен: `localhost` (для разработки)
4. Скопируй ключ и добавь в `.env`:
   ```env
   STEAM_API_KEY=твой_ключ_здесь
   ```

> 📖 Подробная инструкция в файле `STEAM_API_KEY.md`
> 
> ⚠️ Без ключа сайт будет работать, но вместо никнейма будет показываться только SteamID

### 2. Проверить подключение к БД (опционально)

```bash
mysql -h localhost -u cs2user -p cs2db
```

Если подключение успешно — всё ок!

### 3. Запустить dev сервер

```bash
npm run dev
```

Сайт откроется на `http://localhost:3000`

## Как пользоваться

1. Открой `http://localhost:3000`
2. Нажми "Войти через Steam"
3. Авторизуйся через Steam
4. Выбери оружие из списка
5. Выбери скин, настрой float/seed/nametag/StatTrak
6. Сохрани
7. Зайди в CS2 и напиши `!wp` — скин применится!

## Production деплой

```bash
# Build для production
npm run build

# Запустить production сервер
npm run preview
```

Для деплоя на реальный сервер:
- Настрой SITE_URL в .env на свой домен (например https://skins.yourdomain.com)
- Используй PM2 или systemd для запуска
- Настрой nginx как reverse proxy
- Включи HTTPS (обязательно для Steam авторизации в production!)

## Что ещё можно добавить

🚧 **В разработке:**
- Ножи (требуют отдельного маппинга weapon_defindex)
- Перчатки (аналогично ножам)
- Стикеры на оружие
- Keychains (брелоки)
- История изменений скинов
- Админ панель

## Структура проекта

```
app/
├── pages/              # Страницы
│   ├── index.vue       # Главная — список оружий
│   ├── weapon/[id].vue # Выбор скина для оружия
│   ├── agents.vue      # Выбор агентов
│   ├── knives.vue      # Ножи (TODO)
│   └── gloves.vue      # Перчатки (TODO)
├── components/         # UI компоненты
│   ├── SkinCard.vue
│   ├── SkinFilter.vue
│   ├── FloatSlider.vue
│   └── SteamLoginBtn.vue
└── composables/        # Composables
    ├── useSteamAuth.ts
    ├── useSkinsData.ts
    └── usePlayerSkins.ts

server/
├── api/
│   ├── auth/          # Steam авторизация
│   ├── csgo/          # Прокси к CSGO-API с кешем
│   └── skins/         # Работа с БД
└── utils/
    └── db.ts          # MySQL connection pool

shared/
├── types/             # TypeScript типы
└── utils/             # Утилиты (weapons mapping)
```

## Troubleshooting

### Ошибка подключения к БД
- Проверь `.env` файл
- Убедись что MySQL запущен
- Проверь права пользователя БД

### Steam авторизация не работает
- В production обязательно нужен HTTPS
- Проверь что SITE_URL правильный
- Steam OpenID требует публичный URL (localhost работает только для разработки)

### Скины не загружаются
- Проверь интернет соединение (CSGO-API на GitHub)
- Подожди 6 часов если API недоступен (кеш обновится)

## Полезные ссылки

- [Nuxt 4 документация](https://nuxt.com/docs)
- [CSGO-API GitHub](https://github.com/ByMykel/CSGO-API)
- [WeaponPaints плагин](https://github.com/Nereziel/cs2-WeaponPaints)
- [Nuxt UI компоненты](https://ui.nuxt.com)

---

**Готово!** Проект полностью настроен и готов к запуску 🎉
