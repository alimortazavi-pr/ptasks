import axios from "axios";

const api = axios.create({
  baseURL: "https://beige-woodpecker-cuff.cyclic.app/api/v1",
});

export default api;
