const TOKEN_KEY = "accessToken";

//  Store the JWT token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

//  Retrieve the JWT token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

//  Remove the JWT token (Logout)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

//  Decode the JWT token
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

//  Check if the user is authenticated
export function isAuthenticated() {
  return readToken() !== null;
}

// Login Function
export async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ userName: user, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Login failed:", data);
      throw new Error(data.message || "Invalid login credentials");
    }

    setToken(data.token); // Store token in localStorage
    return true;
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    throw new Error(error.message || "An error occurred. Please try again.");
  }
}

//  Register Function
export async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
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
