// export const API_BASE_URL = 'http://localhost:8080';
export const API_BASE_URL = 'https://booking-server-gl3a.onrender.com';
export const ACCESS_TOKEN = 'token';

// export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const OAUTH2_REDIRECT_URI = 'https://booking-app-black.vercel.app/oauth2/redirect';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;