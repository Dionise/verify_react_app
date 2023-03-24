import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchHistory = async () => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch('http://127.0.0.1:8000/api/propriety/history/', {
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

module.exports = {
  fetchHistory,
};
