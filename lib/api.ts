import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BAKEND_BASE_URL });

const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BAKEND_BASE_URL,
});

protectedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api, protectedApi };
