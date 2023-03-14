import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tasks.paradisecode.org/api/v1",
});

export default api;
