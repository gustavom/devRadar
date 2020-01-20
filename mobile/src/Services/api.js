import axios from "axios";
const app = axios.create({
  baseURL: "htto://192.168.0.13:19000"
});

export default app;
