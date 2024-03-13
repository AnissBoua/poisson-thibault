import axios from "axios";
import router from "./router";

axios.interceptors.request.use(function (config) {
  config.baseURL = import.meta.env.VITE_API_URL;
  if (config.url !== "api/token/refresh") {
    config.headers = {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    };
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.config.url != "api/token/refresh"
    ) {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        return axios
          .post("api/token/refresh/", {
            refresh: refreshToken,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.access);
            return axios(originalRequest);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        router.push("/auth");
      }
    }
    return Promise.reject(error);
  }
);
