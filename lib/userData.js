import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to make authorized requests
async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) return [];

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...options.headers,
    },
  });

  if (res.ok) {
    return await res.json();
  } else {
    return [];
  }
}

// Add item to favourites
export async function addToFavourites(id) {
  return await fetchWithAuth(`${API_URL}/favourites/${id}`, { method: "PUT" });
}

// Remove item from favourites
export async function removeFromFavourites(id) {
  return await fetchWithAuth(`${API_URL}/favourites/${id}`, { method: "DELETE" });
}

// Get all favourites
export async function getFavourites() {
  return await fetchWithAuth(`${API_URL}/favourites`);
}

// Add item to history
export async function addToHistory(id) {
  return await fetchWithAuth(`${API_URL}/history/${id}`, { method: "PUT" });
}

// Remove item from history
export async function removeFromHistory(id) {
  return await fetchWithAuth(`${API_URL}/history/${id}`, { method: "DELETE" });
}

// Get all history
export async function getHistory() {
  return await fetchWithAuth(`${API_URL}/history`);
}
