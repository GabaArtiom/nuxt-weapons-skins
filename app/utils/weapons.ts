// Маппинг weapon_defindex → название оружия
export const WEAPON_MAP: Record<number, string> = {
  1: 'Desert Eagle',
  2: 'Dual Berettas',
  3: 'Five-SeveN',
  4: 'Glock-18',
  7: 'AK-47',
  8: 'AUG',
  9: 'AWP',
  10: 'FAMAS',
  11: 'G3SG1',
  13: 'Galil AR',
  14: 'M249',
  16: 'M4A4',
  17: 'MAC-10',
  19: 'P90',
  23: 'MP5-SD',
  24: 'UMP-45',
  25: 'XM1014',
  26: 'PP-Bizon',
  27: 'MAG-7',
  28: 'Negev',
  29: 'Sawed-Off',
  30: 'Tec-9',
  32: 'P2000',
  33: 'MP7',
  34: 'MP9',
  35: 'Nova',
  36: 'P250',
  38: 'SCAR-20',
  39: 'SG 553',
  40: 'SSG 08',
  60: 'M4A1-S',
  61: 'USP-S',
  63: 'CZ75-Auto',
  64: 'R8 Revolver',
}

// Slug mapping for URLs
export const WEAPON_SLUGS: Record<number, string> = {
  1: 'desert-eagle',
  2: 'dual-berettas',
  3: 'five-seven',
  4: 'glock-18',
  7: 'ak-47',
  8: 'aug',
  9: 'awp',
  10: 'famas',
  11: 'g3sg1',
  13: 'galil-ar',
  14: 'm249',
  16: 'm4a4',
  17: 'mac-10',
  19: 'p90',
  23: 'mp5-sd',
  24: 'ump-45',
  25: 'xm1014',
  26: 'pp-bizon',
  27: 'mag-7',
  28: 'negev',
  29: 'sawed-off',
  30: 'tec-9',
  32: 'p2000',
  33: 'mp7',
  34: 'mp9',
  35: 'nova',
  36: 'p250',
  38: 'scar-20',
  39: 'sg-553',
  40: 'ssg-08',
  60: 'm4a1-s',
  61: 'usp-s',
  63: 'cz75-auto',
  64: 'r8-revolver',
}

// Reverse mapping: slug → weapon_id
export const WEAPON_SLUG_TO_ID: Record<string, number> = Object.entries(WEAPON_SLUGS).reduce((acc, [id, slug]) => {
  acc[slug] = parseInt(id)
  return acc
}, {} as Record<string, number>)

export function getWeaponSlug(weaponId: number): string | null {
  return WEAPON_SLUGS[weaponId] || null
}

export function getWeaponIdFromSlug(slug: string): number | null {
  return WEAPON_SLUG_TO_ID[slug] || null
}

// Маппинг weapon_defindex → weapon_name для дефолтных изображений
export const WEAPON_NAME_MAP: Record<number, string> = {
  1: 'weapon_deagle',
  2: 'weapon_elite',
  3: 'weapon_fiveseven',
  4: 'weapon_glock',
  7: 'weapon_ak47',
  8: 'weapon_aug',
  9: 'weapon_awp',
  10: 'weapon_famas',
  11: 'weapon_g3sg1',
  13: 'weapon_galilar',
  14: 'weapon_m249',
  16: 'weapon_m4a1',
  17: 'weapon_mac10',
  19: 'weapon_p90',
  23: 'weapon_mp5sd',
  24: 'weapon_ump45',
  25: 'weapon_xm1014',
  26: 'weapon_bizon',
  27: 'weapon_mag7',
  28: 'weapon_negev',
  29: 'weapon_sawedoff',
  30: 'weapon_tec9',
  32: 'weapon_hkp2000',
  33: 'weapon_mp7',
  34: 'weapon_mp9',
  35: 'weapon_nova',
  36: 'weapon_p250',
  38: 'weapon_scar20',
  39: 'weapon_sg556',
  40: 'weapon_ssg08',
  60: 'weapon_m4a1_silencer',
  61: 'weapon_usp_silencer',
  63: 'weapon_cz75a',
  64: 'weapon_revolver',
}

// Получить URL дефолтного изображения оружия
export function getDefaultWeaponImage(defindex: number): string {
  const weaponName = WEAPON_NAME_MAP[defindex]
  if (!weaponName) return ''
  return `https://raw.githubusercontent.com/Nereziel/cs2-WeaponPaints/main/website/img/skins/${weaponName}.png`
}

// Категории оружия
export const WEAPON_CATEGORIES = {
  pistols: [1, 2, 3, 4, 30, 32, 36, 61, 63, 64],
  rifles: [7, 8, 10, 13, 16, 39, 60],
  smgs: [17, 19, 23, 24, 26, 33, 34],
  heavy: [14, 25, 28, 29, 35],
  snipers: [9, 11, 38, 40],
}

export function getWeaponName(defindex: number): string {
  return WEAPON_MAP[defindex] || 'Unknown'
}

export function getWeaponCategory(defindex: number): string {
  for (const [category, weapons] of Object.entries(WEAPON_CATEGORIES)) {
    if (weapons.includes(defindex)) {
      return category
    }
  }
  return 'other'
}

// Оружия доступные только для CT
const CT_ONLY_WEAPONS = [
  3,  // Five-SeveN
  32, // P2000
  61, // USP-S
  10, // FAMAS
  16, // M4A4
  60, // M4A1-S
  8,  // AUG
  38, // SCAR-20
  34, // MP9
  27, // MAG-7
]

// Оружия доступные только для T
const T_ONLY_WEAPONS = [
  4,  // Glock-18
  30, // Tec-9
  7,  // AK-47
  13, // Galil AR
  39, // SG 553
  11, // G3SG1
  17, // MAC-10
  29, // Sawed-Off
]

// Проверить, доступно ли оружие для команды
export function isWeaponAvailableForTeam(defindex: number, team: 2 | 3): boolean {
  // team 2 = T, team 3 = CT

  if (team === 3) {
    // CT: не показываем оружия только для T
    return !T_ONLY_WEAPONS.includes(defindex)
  } else {
    // T: не показываем оружия только для CT
    return !CT_ONLY_WEAPONS.includes(defindex)
  }
}

// Получить список оружий доступных для команды
export function getWeaponsForTeam(team: 2 | 3): number[] {
  return Object.keys(WEAPON_MAP)
    .map(id => parseInt(id))
    .filter(id => isWeaponAvailableForTeam(id, team))
}
