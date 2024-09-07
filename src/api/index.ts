import axios from "axios";

const api = axios.create({
  baseURL: "https://ptasks.liara.run/api/v1",
});

export default api;
