import type { Agent } from '~/utils/skins'

export default defineCachedEventHandler(async () => {
  const data = await $fetch<Agent[]>(
    'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/agents.json'
  )
  return data
}, {
  maxAge: 60 * 60 * 6,
  name: 'csgo-agents',
})
