const TOKEN_KEY = "accessToken";

// Store the JWT token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Retrieve the JWT token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove the JWT token (logout)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decode the JWT token
export function readToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

// Check if the user is authenticated
export function isAuthenticated() {
  const token = readToken();
  return token !== null;
}

// Login Function
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    setToken(data.token); // Store token in localStorage
    return true;
  } else {
    throw new Error("Invalid login credentials");
  }
}

// Register Function
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return true; // Registration successful
  } else {
    throw new Error("Registration failed");
  }
}
