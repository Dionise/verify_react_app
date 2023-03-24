import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch('http://127.0.0.1:8000/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }
    return responseData; // return responseData object directly
  } catch (error) {
    console.error('Get user request error:', error);
    const errorMessage = error.message || 'Could not get user details';
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email, password) => {
  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  const response = await fetch('http://127.0.0.1:8000/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfData.csrfToken,
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  });
  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  // Return both the access and refresh tokens
  return {
    access: responseData.access,
    refresh: responseData.refresh,
  };
};

export const registerUser = async (firstName, lastName, email, password) => {
  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );

  // Send the registration request with the CSRF token included
  const body = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  });

  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfResponse.headers.get('X-CSRFToken'),
      },
      body: body,
      credentials: 'include',
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }

    return responseData;
  } catch (error) {
    console.error('Registration request error:', error);
    const errorMessage = error.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  console.log(refreshToken);

  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfData.csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({refreshtoken: refreshToken}),
    });

    const responseData = await response.text();
    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }
    const jsonData = responseData ? JSON.parse(responseData) : null;
    return jsonData;
  } catch (error) {
    console.error('Logout request error:', error);
    const errorMessage = error.message || 'Logout failed';
    throw new Error(errorMessage);
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/verify/', {
      method: 'GET',
      credentials: 'include',
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }
    return responseData;
  } catch (error) {
    console.error('Check authentication request error:', error);
    const errorMessage =
      error.message || 'Could not check authentication status';
    throw new Error(errorMessage);
  }
};

export const resetPassword = async email => {
  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );

  const body = JSON.stringify({
    email: email,
  });

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/users/reset-password/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfResponse.headers.get('X-CSRFToken'),
        },
        body: body,
        credentials: 'include',
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }

    return responseData;
  } catch (error) {
    console.error('Reset password request error:', error);
    const errorMessage = error.message || 'Reset password failed';
    throw new Error(errorMessage);
  }
};

export const resetPasswordConfirmations = async (uid, token, new_password) => {
  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );

  const body = JSON.stringify({
    uid: uid,
    token: token,
    new_password: new_password,
  });

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/users/reset-password-confirm/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfResponse.headers.get('X-CSRFToken'),
        },
        body: body,
        credentials: 'include',
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      const errorData = responseData;
      throw new Error(errorData.detail);
    }

    return responseData;
  } catch (error) {
    console.error('Reset password confirmation request error:', error);
    const errorMessage = error.message || 'Reset password confirmation failed';
    throw new Error(errorMessage);
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  resetPasswordConfirmations,
  logoutUser,
  checkAuthentication,
  resetPassword,
};
//moscaluarina1234
//Osk@gmail.com
