import api, { getHeader } from "../api/AxiosConfig";

/* This function register a new user */
export function registerUser(registration) {
  return api.post("/auth/signup", registration);
}

/* This function login a registered user */
export function loginUser(credentials) {
  return api.post("/auth/login", credentials);
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