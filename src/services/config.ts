import axios from "axios";

const profiles = {
  prod: "",
  staging: "https://album-qatar-back-stg.herokuapp.com",
  local: "http://localhost:2000"
};

export const API_URL = profiles.local;

const client = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

export default client;
