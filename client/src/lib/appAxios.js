import axios from "axios";

export const appAxios = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
