import axios from "axios";

const token = window.localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});
