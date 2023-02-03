import axios from "axios";

const api = axios.create({
  baseURL: "https://api-ptasks.alimortazavi.org/api/v1",
});

export default api;
