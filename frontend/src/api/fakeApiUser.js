//example api request: replace with your API request here in folder API
import CookieManager from '@react-native-cookies/cookies'

export const getUser = () => {
  try {
    return Promise.resolve({
      status: 'success',
      data: [
        { id: 1, name: 'Fira' },
        { id: 2, name: 'Nadia' },
        { id: 3, name: 'Handy' },
        { id: 4, name: 'Fakara' }
      ]
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export const registerUser = async (firstName, lastName, email, password) => {
  const body = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password
  })

  await CookieManager.clearAll()

  const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(errorData.detail)
  }

  const responseData = await response.json()
  return responseData
}

module.exports = {
  getUser,
  registerUser
}
