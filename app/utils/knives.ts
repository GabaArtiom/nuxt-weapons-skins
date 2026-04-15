// Mapping of knife weapon_id to weapon name for wp_player_knife table
export const KNIFE_MAP: Record<number, string> = {
  500: 'weapon_bayonet',
  503: 'weapon_knife_css',
  505: 'weapon_knife_flip',
  506: 'weapon_knife_gut',
  507: 'weapon_knife_karambit',
  508: 'weapon_knife_m9_bayonet',
  509: 'weapon_knife_tactical',
  512: 'weapon_knife_falchion',
  514: 'weapon_knife_survival_bowie',
  515: 'weapon_knife_butterfly',
  516: 'weapon_knife_push',
  517: 'weapon_knife_cord',
  518: 'weapon_knife_canis',
  519: 'weapon_knife_ursus',
  520: 'weapon_knife_gypsy_jackknife',
  521: 'weapon_knife_outdoor',
  522: 'weapon_knife_stiletto',
  523: 'weapon_knife_widowmaker',
  525: 'weapon_knife_skeleton',
}

// Slug mapping for URLs
export const KNIFE_SLUGS: Record<number, string> = {
  500: 'bayonet',
  503: 'classic-knife',
  505: 'flip-knife',
  506: 'gut-knife',
  507: 'karambit',
  508: 'm9-bayonet',
  509: 'huntsman-knife',
  512: 'falchion-knife',
  514: 'bowie-knife',
  515: 'butterfly-knife',
  516: 'shadow-daggers',
  517: 'paracord-knife',
  518: 'survival-knife',
  519: 'ursus-knife',
  520: 'navaja-knife',
  521: 'nomad-knife',
  522: 'stiletto-knife',
  523: 'talon-knife',
  525: 'skeleton-knife',
}

// Reverse mapping: slug → weapon_id
export const KNIFE_SLUG_TO_ID: Record<string, number> = Object.entries(KNIFE_SLUGS).reduce((acc, [id, slug]) => {
  acc[slug] = parseInt(id)
  return acc
}, {} as Record<string, number>)

export function getKnifeName(weaponId: number): string | null {
  return KNIFE_MAP[weaponId] || null
}

export function getKnifeSlug(weaponId: number): string | null {
  return KNIFE_SLUGS[weaponId] || null
}

export function getKnifeIdFromSlug(slug: string): number | null {
  return KNIFE_SLUG_TO_ID[slug] || null
}

export function isKnife(weaponId: number): boolean {
  return weaponId in KNIFE_MAP
}
