export default defineEventHandler(async (event) => {
  const steamid = getCookie(event, 'steamid')
  if (!steamid) {
    return { knife_t: null, knife_ct: null }
  }

  const db = await useDatabase()
  const [rows] = await db.execute<any[]>(
    'SELECT weapon_team, knife FROM wp_player_knife WHERE steamid = ?',
    [steamid]
  )

  const result = { knife_t: null as string | null, knife_ct: null as string | null }
  rows.forEach((row: any) => {
    if (row.weapon_team === 2) result.knife_t = row.knife
    if (row.weapon_team === 3) result.knife_ct = row.knife
  })

  return result
})
