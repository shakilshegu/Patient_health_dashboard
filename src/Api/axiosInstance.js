import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const getTokenFromCookie = (cookieName) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return cookieValue || null;
};

axiosInstance.interceptors.request.use(
   (config) => {
    try {
      const token =  getTokenFromCookie("AdminsecretKey");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error); 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };