export interface Skin {
  id: string
  name: string
  weapon: {
    id: string
    weapon_id: number
  }
  paint_index: string
  min_float: number
  max_float: number
  stattrak: boolean
  rarity: {
    name: string
    color: string
  }
  image: string
}

export interface PlayerSkin {
  steamid: string
  weapon_defindex: number
  weapon_paint_id: number | null
  weapon_wear: number | null
  weapon_seed: number | null
  weapon_nametag: string | null
  weapon_stattrak: boolean
  weapon_stattrak_count: number | null
  weapon_team: number
}

export interface Agent {
  id: string
  name: string
  description: string
  rarity: {
    name: string
    color: string
  }
  team: {
    id: string
    name: string
  }
  image: string
}

export interface Sticker {
  id: string
  name: string
  description: string
  rarity: {
    name: string
    color: string
  }
  image: string
}

export interface Keychain {
  id: string
  name: string
  description: string
  rarity: {
    name: string
    color: string
  }
  image: string
}
