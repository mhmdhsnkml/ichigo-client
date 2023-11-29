import axios from "axios";

const BASE_URL = "http://localhost:3000/";

type IUser = {
  id: number,
  name: string,
  tier: string,
  createdAt: string,
  updatedAt: string
}

export const ichigoApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const getUsers = async () => {
  const response = await ichigoApi.get<IUser[]>(`users`);

  return response.data;
}

export const getUser = async ({ id }) => {
  const response = await ichigoApi.get<IUser[]>(`users/${id}`);

  return response.data;
}

export const getOrdersByUserId = async ({ id, offset, limit }) => {
  const response = await ichigoApi.get(`users/${id}/orders?is_count=true&offset=${offset}&limit=${limit}`)

  return response.data
}
