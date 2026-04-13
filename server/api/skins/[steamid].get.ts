import type { PlayerSkin } from '~/utils/skins'

export default defineEventHandler(async (event) => {
  const steamid = getRouterParam(event, 'steamid')

  if (!steamid) {
    throw createError({ statusCode: 400, message: 'SteamID required' })
  }

  const db = await useDatabase()
  const [rows] = await db.execute<any[]>(
    'SELECT * FROM wp_player_skins WHERE steamid = ?',
    [steamid]
  )

  return rows as PlayerSkin[]
})
