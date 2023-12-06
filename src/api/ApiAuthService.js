import api, { getHeader } from "../api/AxiosConfig";

/* This function register a new user */
export function registerUser(registration) {
  return api.post("/auth/signup", registration);
}

/* This function login a registered user */
export async function loginUser(credentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*  This is function to get the user profile */
export async function getUserProfile() {
  try {
    const response = await api.get('/users/me')
    return response.data;
  } catch (error) {
    throw new Error(`${error.message}`)
  }
}