import axios from "axios";
import { signOut } from "next-auth/react";
import { HttpClient } from "../http/http-client";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function createPontoCloudApi(token?: string) {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  instance.interceptors.response.use(
    response => response,
    async error => {
      const status = error.response?.status;
      if (status === 401) {
        return await signOut({ callbackUrl: '/signin' });
      }
      return Promise.reject(error);
    }
  );
  return new HttpClient(instance);
}

export const pontoCloudApi = new HttpClient(instance)
