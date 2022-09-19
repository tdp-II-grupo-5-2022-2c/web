import axios from "axios";

const profiles = {
  prod: "",
  staging: "https://album-qatar-back-stg.herokuapp.com"
};

export const API_URL = profiles.staging;

const client = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

export default client;
