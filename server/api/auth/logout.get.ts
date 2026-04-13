export default defineEventHandler(async (event) => {
  deleteCookie(event, 'steamid')
  await sendRedirect(event, '/')
})
