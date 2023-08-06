import axios from "axios";

const api = axios.create({
  baseURL: "https://ptasks-back.cyclic.app/api/v1",
});

export default api;
