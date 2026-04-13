export default defineEventHandler(async (event) => {
  const steamid = getCookie(event, 'steamid')

  if (!steamid) {
    return { authenticated: false, steamid: null }
  }

  return { authenticated: true, steamid }
})
