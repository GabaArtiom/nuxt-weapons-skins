import type { Skin } from '~/utils/skins'

export default defineCachedEventHandler(async () => {
  const data = await $fetch<Skin[]>(
    'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json',
    {
      parseResponse: JSON.parse
    }
  )
  console.log('API handler: fetched', Array.isArray(data) ? data.length : 'not array', 'items')
  return data
}, {
  maxAge: 60 * 60 * 6, // Cache for 6 hours
  name: 'csgo-skins',
})
