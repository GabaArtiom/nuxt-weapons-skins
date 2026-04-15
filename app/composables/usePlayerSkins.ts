import type { PlayerSkin } from '~/utils/skins'

export const usePlayerSkins = () => {
  const { user } = useSteamAuth()
  const playerSkins = useState<PlayerSkin[]>('player-skins', () => [])
  const loading = useState('player-skins-loading', () => false)

  const fetchPlayerSkins = async () => {
    console.log('fetchPlayerSkins: user.steamid =', user.value.steamid)
    if (!user.value.steamid) {
      console.log('fetchPlayerSkins: no steamid, skipping')
      return
    }
    loading.value = true
    try {
      console.log('fetchPlayerSkins: fetching from API...')
      const data = await $fetch<PlayerSkin[]>(`/api/skins/${user.value.steamid}`)
      console.log('fetchPlayerSkins: API returned', data.length, 'skins')
      playerSkins.value = data
    } catch (error) {
      console.error('fetchPlayerSkins: error', error)
    } finally {
      loading.value = false
    }
  }

  const saveSkin = async (skinData: Partial<PlayerSkin>) => {
    await $fetch('/api/skins/save', {
      method: 'POST',
      body: skinData,
    })
    await fetchPlayerSkins()
  }

  const getPlayerSkin = (weaponDefindex: number, team: number = 0) => {
    return playerSkins.value.find(
      skin => skin.weapon_defindex === weaponDefindex && skin.weapon_team === team
    )
  }

  return {
    playerSkins,
    loading,
    fetchPlayerSkins,
    saveSkin,
    getPlayerSkin,
  }
}
