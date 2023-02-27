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
  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include'
    }
  )

  // Send the registration request with the CSRF token included
  const body = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password
  })

  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfResponse.headers.get('X-CSRFToken')
      },
      body: body,
      credentials: 'include'
    })

    const responseData = await response.json()

    if (!response.ok) {
      const errorData = responseData
      throw new Error(errorData.detail)
    }

    return responseData
  } catch (error) {
    console.error('Registration request error:', error)
    const errorMessage = error.message || 'Registration failed'
    throw new Error(errorMessage)
  }
}

module.exports = {
  getUser,
  registerUser
}
