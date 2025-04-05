import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to make authorized requests
async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // switched to Bearer (standard)
        ...options.headers,
      },
    });

    if (!res.ok) {
      console.error("Fetch failed:", res.status, res.statusText);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("fetchWithAuth error:", error.message);
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
