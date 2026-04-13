import { KNIFE_MAP } from '~/utils/knives'

export default defineEventHandler(async (event) => {
  const steamid = getCookie(event, 'steamid')
  if (!steamid) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody(event)
  const {
    weapon_defindex,
    weapon_paint_id,
    weapon_wear,
    weapon_seed,
    weapon_nametag,
    weapon_stattrak,
    weapon_team,
  } = body

  console.log('Saving skin:', {
    steamid,
    weapon_defindex,
    weapon_paint_id,
    weapon_wear,
    weapon_seed,
    weapon_nametag,
    weapon_stattrak,
    weapon_team,
  })

  if (!weapon_defindex) {
    throw createError({ statusCode: 400, message: 'weapon_defindex required' })
  }

  const db = await useDatabase()

  // Check if this is a knife
  const knifeName = KNIFE_MAP[weapon_defindex]
  if (knifeName) {
    console.log('This is a knife:', knifeName)

    // Update wp_player_knife table
    await db.execute(`
      INSERT INTO wp_player_knife (steamid, weapon_team, knife)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE knife = VALUES(knife)
    `, [steamid, weapon_team, knifeName])

    console.log('Updated wp_player_knife table')
  }

  // Check if this is gloves (weapon_defindex >= 5000)
  if (weapon_defindex >= 5000 && weapon_defindex < 6000) {
    console.log('This is gloves, weapon_defindex:', weapon_defindex)

    // Update wp_player_gloves table
    await db.execute(`
      INSERT INTO wp_player_gloves (steamid, weapon_team, weapon_defindex)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE weapon_defindex = VALUES(weapon_defindex)
    `, [steamid, weapon_team, weapon_defindex])

    console.log('Updated wp_player_gloves table')
  }

  // Delete existing entry for this weapon and team
  console.log('Deleting existing entry for weapon_defindex:', weapon_defindex, 'team:', weapon_team)
  const deleteResult = await db.execute(`
    DELETE FROM wp_player_skins
    WHERE steamid = ? AND weapon_defindex = ? AND weapon_team = ?
  `, [steamid, weapon_defindex, weapon_team])
  console.log('Deleted rows:', deleteResult)

  // Insert new entry for the selected team
  console.log('Inserting for team:', weapon_team)
  await db.execute(`
    INSERT INTO wp_player_skins
      (steamid, weapon_defindex, weapon_paint_id, weapon_wear, weapon_seed, weapon_nametag, weapon_stattrak, weapon_team)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    steamid,
    weapon_defindex,
    weapon_paint_id ?? null,
    weapon_wear ?? null,
    weapon_seed ?? null,
    weapon_nametag ?? null,
    weapon_stattrak ? 1 : 0,
    weapon_team,
  ])

  console.log('Successfully saved skin for team', weapon_team)
  return { success: true }
})
