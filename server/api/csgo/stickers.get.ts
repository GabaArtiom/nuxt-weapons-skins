import type { Sticker } from '~/utils/skins'

export default defineCachedEventHandler(async () => {
  const data = await $fetch<Sticker[]>(
    'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/stickers.json'
  )
  return data
}, {
  maxAge: 60 * 60 * 6,
  name: 'csgo-stickers',
})
