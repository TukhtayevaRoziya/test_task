import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/actions/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://fakestoreapi.com/",
  // "https://api.escuelajs.co/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer <token_here>",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
