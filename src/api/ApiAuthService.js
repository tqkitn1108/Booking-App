import api, { getHeader } from "../api/AxiosConfig";

/* This function register a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/signup", registration);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`)
    }
  }
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
    const response = await api.get('/users/me', {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    throw error
  }
}