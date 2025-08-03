import axios from 'axios';

const API_BASE_URL =  import.meta.env.VITE_HOST_TARGET_API;

let accessToken = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor: Injects the access token into the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setApiToken = (token) => {
  accessToken = token;
};


export const clearApiToken = () => {
  accessToken = null;
};


export const getApiToken = () => {
  return accessToken;
};


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retryAttempted) {
      originalRequest._retryAttempted = true;
      console.warn("[axios intercept] [401] token may be invalid or expired.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;