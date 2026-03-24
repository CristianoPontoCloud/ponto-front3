import axios from "axios";
import { HttpClient } from "../http/http-client";

export function createLocalApi() {
  const instance = axios.create({
    baseURL: process.env.API_LOCAL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return new HttpClient(instance);
}

