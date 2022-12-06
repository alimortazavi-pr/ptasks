import axios from "axios";

const api = axios.create({
  baseURL: "http://beige-woodpecker-cuff.cyclic.app/api/v1",
});

export default api;
