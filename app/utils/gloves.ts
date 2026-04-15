// Glove slugs for URLs
export const GLOVE_SLUGS: Record<number, string> = {
  5027: 'studded-bloodhound',
  5028: 'default-gloves',
  5029: 'studded-hydra',
  5030: 'slick',
  5031: 'leather-handwraps',
  5032: 'motorcycle',
  5033: 'specialist',
  5034: 'studded-sport',
  5035: 'broken-fang',
}

// Reverse mapping: slug → weapon_id
export const GLOVE_SLUG_TO_ID: Record<string, number> = Object.entries(GLOVE_SLUGS).reduce((acc, [id, slug]) => {
  acc[slug] = parseInt(id)
  return acc
}, {} as Record<string, number>)

export function getGloveSlug(weaponId: number): string | null {
  return GLOVE_SLUGS[weaponId] || null
}

export function getGloveIdFromSlug(slug: string): number | null {
  return GLOVE_SLUG_TO_ID[slug] || null
}

export function isGlove(weaponId: number): boolean {
  return weaponId >= 5000 && weaponId < 6000
}
