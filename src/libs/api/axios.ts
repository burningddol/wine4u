import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axios;
