import axios from "axios";

const api = axios.create({
  baseURL: "https://tasks-api.alimortazavi.org/api/v1",
});

export default api;
