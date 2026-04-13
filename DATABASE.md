# Настройка базы данных

## Требования

Сайт использует ту же базу данных MySQL что и плагин WeaponPaints.
Таблица `wp_player_skins` должна быть уже создана плагином.

## Шаги настройки

### 1. Найти данные подключения к БД

Данные находятся в конфиге плагина WeaponPaints на вашем CS2 сервере:
```
csgo/addons/counterstrikesharp/configs/plugins/WeaponPaints/WeaponPaints.json
```

Пример конфига плагина:
```json
{
  "DatabaseHost": "localhost",
  "DatabasePort": 3306,
  "DatabaseUser": "cs2user",
  "DatabasePassword": "yourpassword",
  "DatabaseName": "cs2db"
}
```

### 2. Настроить .env файл

Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

Отредактируйте `.env` с данными из конфига плагина:
```env
DB_HOST=localhost
DB_USER=cs2user
DB_PASSWORD=yourpassword
DB_NAME=cs2db
SITE_URL=http://localhost:3000
```

### 3. Проверить доступ к БД

Убедитесь что сайт может подключиться к MySQL:

```bash
# Если MySQL на том же сервере что и сайт
mysql -u cs2user -p cs2db

# Если MySQL на другом сервере, проверьте что порт 3306 открыт
# и пользователь имеет права доступа с вашего IP
```

### 4. Права пользователя БД

Пользователю нужны права на SELECT, INSERT, UPDATE для таблицы `wp_player_skins`:

```sql
GRANT SELECT, INSERT, UPDATE ON cs2db.wp_player_skins TO 'cs2user'@'%';
FLUSH PRIVILEGES;
```

## Структура таблицы

Таблица создаётся автоматически плагином при первом запуске:

```sql
CREATE TABLE `wp_player_skins` (
  `steamid` VARCHAR(64) NOT NULL,
  `weapon_defindex` INT NOT NULL,
  `weapon_paint_id` INT DEFAULT NULL,
  `weapon_wear` FLOAT DEFAULT NULL,
  `weapon_seed` INT DEFAULT NULL,
  `weapon_nametag` VARCHAR(255) DEFAULT NULL,
  `weapon_stattrak` TINYINT(1) DEFAULT 0,
  `weapon_stattrak_count` INT DEFAULT NULL,
  `weapon_team` INT DEFAULT 0,
  PRIMARY KEY (`steamid`, `weapon_defindex`, `weapon_team`)
);
```

## Troubleshooting

### Ошибка подключения
```
Error: connect ECONNREFUSED
```
- Проверьте что MySQL запущен
- Проверьте DB_HOST и порт
- Проверьте firewall правила

### Ошибка авторизации
```
Error: Access denied for user
```
- Проверьте DB_USER и DB_PASSWORD
- Проверьте права пользователя в MySQL

### Таблица не найдена
```
Error: Table 'cs2db.wp_player_skins' doesn't exist
```
- Запустите плагин WeaponPaints на сервере хотя бы один раз
- Плагин создаст таблицу автоматически
