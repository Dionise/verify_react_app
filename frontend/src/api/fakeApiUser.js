//example api request: replace with your API request here in folder API

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

  const response = await fetch('https://example.com/api/users/register', {
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
