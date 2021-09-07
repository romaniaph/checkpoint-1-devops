import axios from "axios";

const api = axios.create({
  baseURL: "https://wa-xcave.azurewebsites.net",
});

export default api;