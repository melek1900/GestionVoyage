export const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchHebergements() {
  const res = await fetch(`${API_BASE_URL}/hebergements`);
  if (!res.ok) throw new Error('Erreur lors de la récupération');
  return res.json();
}
