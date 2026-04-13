interface SteamProfile {
  steamid: string
  personaname: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  profileurl: string
}

export const useSteamAuth = () => {
  const user = useState<{ authenticated: boolean; steamid: string | null }>('steam-user', () => ({
    authenticated: false,
    steamid: null,
  }))

  const profile = useState<SteamProfile | null>('steam-profile', () => null)

  const fetchUser = async () => {
    if (process.server) return // Skip on server

    try {
      const data = await $fetch('/api/auth/me')
      user.value = data

      // Fetch Steam profile if authenticated
      if (data.authenticated && data.steamid) {
        try {
          profile.value = await $fetch(`/api/steam/profile/${data.steamid}`)
        } catch (error) {
          console.error('Failed to fetch Steam profile:', error)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const login = () => {
    if (process.client) {
      window.location.href = '/api/auth/steam'
    }
  }

  const logout = () => {
    if (process.client) {
      window.location.href = '/api/auth/logout'
    }
  }

  return {
    user,
    profile,
    fetchUser,
    login,
    logout,
  }
}
