const BASE_URL = 'http://192.168.254.111:8000/api';

export async function authLogin({ email, password }) {
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  console.log('API RESPONSE:', data);

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
}