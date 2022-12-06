import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:7011/api/v1",
});

export default api;
