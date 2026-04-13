export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const returnUrl = `${config.public.siteUrl}/api/auth/callback`

  const steamUrl =
    `https://steamcommunity.com/openid/login` +
    `?openid.ns=http://specs.openid.net/auth/2.0` +
    `&openid.mode=checkid_setup` +
    `&openid.return_to=${encodeURIComponent(returnUrl)}` +
    `&openid.realm=${encodeURIComponent(config.public.siteUrl)}` +
    `&openid.identity=http://specs.openid.net/auth/2.0/identifier_select` +
    `&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`

  await sendRedirect(event, steamUrl)
})
