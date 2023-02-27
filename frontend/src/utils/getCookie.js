export const getCookie = name => {
  const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${name}=`))

  if (!cookieValue) return null

  return cookieValue.split('=')[1]
}
