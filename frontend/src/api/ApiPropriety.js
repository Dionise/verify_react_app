import AsyncStorage from '@react-native-async-storage/async-storage';

export const searchAddresses = async query => {
  const token = await AsyncStorage.getItem('token');

  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  const response = await fetch(
    `http://127.0.0.1:8000/api/propriety/search-address?query=${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfData.csrfToken,
      },
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  return responseData;
};

export const updateFavoritePropertyStatus = async (place_id, is_favorite) => {
  const token = await AsyncStorage.getItem('token');

  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  const response = await fetch(
    `http://127.0.0.1:8000/api/propriety/toggle-favorite/${place_id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfData.csrfToken,
      },
      body: JSON.stringify({is_favorite}),
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  return responseData;
};

export const addproprietydetails = async (
  location,
  latitude,
  longitude,
  address,
  details,
  place_id,
) => {
  const token = await AsyncStorage.getItem('token');

  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  const body = JSON.stringify({
    location,
    latitude,
    longitude,
    address,
    details,
    place_id,
  });

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/propriety/save-location',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfData.csrfToken,
          Authorization: `Bearer ${token}`,
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
    const errorMessage = error.message || 'S';
    throw new Error(errorMessage);
  }
};

export const fetchFavorites = async () => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(
    'http://127.0.0.1:8000/api/propriety/favorites/',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  return responseData;
};

export const deleteFavorite = async id => {
  const token = await AsyncStorage.getItem('token');

  const csrfResponse = await fetch(
    'http://127.0.0.1:8000/api/users/csrf_token/',
    {
      credentials: 'include',
    },
  );
  const csrfData = await csrfResponse.json();

  const response = await fetch(
    `http://127.0.0.1:8000/api/propriety/deletefavorite/${id}/`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfData.csrfToken,
      },
    },
  );

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.detail);
  }
};

module.exports = {
  deleteFavorite,
  addproprietydetails,
  searchAddresses,
  updateFavoritePropertyStatus,
  fetchFavorites,
};
