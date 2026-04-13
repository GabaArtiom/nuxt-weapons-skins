import type { Keychain } from '~/utils/skins'

export default defineCachedEventHandler(async () => {
  const data = await $fetch<Keychain[]>(
    'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keychains.json'
  )
  return data
}, {
  maxAge: 60 * 60 * 6,
  name: 'csgo-keychains',
})
