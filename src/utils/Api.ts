import axios from "axios";

export const baseURL = "http://localhost:8000";

const admin = axios.create({
  baseURL: "http://localhost:8000/api/v2/",
});

export default admin;
