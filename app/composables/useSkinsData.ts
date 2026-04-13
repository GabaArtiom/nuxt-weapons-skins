import type { Skin } from '~/utils/skins'

export const useSkinsData = () => {
  const skins = useState<Skin[]>('skins', () => [])
  const loading = useState('skins-loading', () => false)

  const fetchSkins = async () => {
    console.log('fetchSkins called, current skins length:', skins.value.length)
    if (skins.value.length > 0) {
      console.log('Skins already loaded, skipping fetch')
      return
    }
    loading.value = true
    try {
      console.log('Fetching skins from API...')
      let data = await $fetch<Skin[]>('/api/csgo/skins')
      console.log('API response received, type:', typeof data, 'isArray:', Array.isArray(data))

      // If data is a string, parse it
      if (typeof data === 'string') {
        console.log('Parsing string response...')
        data = JSON.parse(data)
      }

      // API returns array directly
      skins.value = Array.isArray(data) ? data : []
      console.log('Skins stored, new length:', skins.value.length)
    } catch (error) {
      console.error('Failed to fetch skins:', error)
      skins.value = []
    } finally {
      loading.value = false
    }
  }

  const getSkinsByWeapon = (weaponId: number) => {
    console.log('getSkinsByWeapon called with weaponId:', weaponId)
    console.log('Total skins loaded:', skins.value.length)
    const filtered = skins.value.filter(skin => skin.weapon?.weapon_id === weaponId)
    console.log('Filtered skins for weapon', weaponId, ':', filtered.length)
    if (filtered.length > 0) {
      console.log('First skin:', filtered[0])
    }
    return filtered
  }

  const getSkinByPaintIndex = (paintIndex: string) => {
    return skins.value.find(skin => skin.paint_index === paintIndex)
  }

  return {
    skins,
    loading,
    fetchSkins,
    getSkinsByWeapon,
    getSkinByPaintIndex,
  }
}
