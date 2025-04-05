const TOKEN_KEY = "accessToken";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function readToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function isAuthenticated() {
  return readToken() !== null;
}

export async function authenticateUser(user, password) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: user, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message || "Invalid login credentials");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ userName: user, password, password2 }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Registration failed:", data);
      throw new Error(data.message || "Registration failed. Please try again.");
    }

    return true;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw new Error(error.message || "An error occurred. Please try again.");
  }
}
