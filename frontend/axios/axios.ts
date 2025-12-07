import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000",
    baseURL: "http://10.0.2.2:5000",  // si utilise amilator android studio

  headers: {
    "Content-Type": "application/json",
  },
});

export default API;