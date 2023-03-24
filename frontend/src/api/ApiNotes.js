import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchNotes = async () => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch('http://127.0.0.1:8000/api/propriety/notes/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  return responseData;
};

export const addnotes = async noteData => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch('http://127.0.0.1:8000/api/propriety/notes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = responseData;
    throw new Error(errorData.detail);
  }

  return responseData;
};

module.exports = {
  fetchNotes,
  addnotes,
};
