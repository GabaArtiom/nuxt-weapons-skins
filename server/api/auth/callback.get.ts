export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const claimedId = query['openid.claimed_id']?.toString() ?? ''
  const steamId = claimedId.split('/').pop()

  if (!steamId) {
    throw createError({ statusCode: 400, message: 'Invalid Steam response' })
  }

  // Verify the response with Steam
  const mode = query['openid.mode']
  if (mode !== 'id_res') {
    throw createError({ statusCode: 400, message: 'Invalid OpenID mode' })
  }

  setCookie(event, 'steamid', steamId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  })

  await sendRedirect(event, '/')
})
