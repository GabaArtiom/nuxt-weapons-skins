export default defineEventHandler(async (event) => {
  const steamid = getCookie(event, 'steamid')
  if (!steamid) {
    return { gloves_t: null, gloves_ct: null }
  }

  const db = await useDatabase()
  const [rows] = await db.execute<any[]>(
    'SELECT weapon_team, weapon_defindex FROM wp_player_gloves WHERE steamid = ?',
    [steamid]
  )

  const result = { gloves_t: null as number | null, gloves_ct: null as number | null }
  rows.forEach((row: any) => {
    if (row.weapon_team === 2) result.gloves_t = row.weapon_defindex
    if (row.weapon_team === 3) result.gloves_ct = row.weapon_defindex
  })

  return result
})
