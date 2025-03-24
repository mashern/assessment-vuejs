import axios from "axios"
import type { User, Hotel, NearestUserResult } from "../types"

const apiClient = axios.create({
  baseURL: "http://localhost:5249/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default {
  getUsers() {
    return apiClient.get<User[]>("/users")
  },

  getUser(id: number) {
    return apiClient.get<User>(`/users/${id}`)
  },

  createUser(user: Omit<User, "id">) {
    return apiClient.post<User>("/users", user)
  },

  updateUser(id: number, user: User) {
    return apiClient.put<void>(`/users/${id}`, user)
  },

  deleteUser(id: number) {
    return apiClient.delete<void>(`/users/${id}`)
  },

  findNearestUsersToHotels(hotels: Hotel[]) {
    return apiClient.post<NearestUserResult[]>("/users/nearest-to-hotels", hotels)
  },
}

