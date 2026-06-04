const API_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`,
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return response.json();
};