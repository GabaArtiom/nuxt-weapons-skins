export default defineEventHandler(async (event) => {
  const steamid = getRouterParam(event, 'steamid')

  if (!steamid) {
    throw createError({ statusCode: 400, message: 'SteamID required' })
  }

  const config = useRuntimeConfig()

  if (!config.steamApiKey) {
    throw createError({ statusCode: 500, message: 'Steam API key not configured' })
  }

  try {
    const response = await $fetch<any>(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.steamApiKey}&steamids=${steamid}`
    )

    const player = response.response?.players?.[0]

    if (!player) {
      throw createError({ statusCode: 404, message: 'Player not found' })
    }

    return {
      steamid: player.steamid,
      personaname: player.personaname,
      avatar: player.avatar,
      avatarmedium: player.avatarmedium,
      avatarfull: player.avatarfull,
      profileurl: player.profileurl,
    }
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Failed to fetch Steam profile' })
  }
})
