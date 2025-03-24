import { defineStore } from "pinia"
import userApi from "../api/userApi"
import type { User, Hotel, NearestUserResult } from "../types"

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
    nearestUsers: [] as NearestUserResult[],
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const response = await userApi.getUsers()
        this.users = response.data
      } catch (error) {
        this.error = "Failed to fetch users"
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addUser(user: Omit<User, "id">) {
      this.loading = true
      this.error = null

      try {
        const response = await userApi.createUser(user)
        this.users.push(response.data)
      } catch (error) {
        this.error = "Failed to add user"
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async updateUser(id: number, user: User) {
      this.loading = true
      this.error = null

      try {
        await userApi.updateUser(id, user)
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) {
          this.users[index] = user
        }
      } catch (error) {
        this.error = "Failed to update user"
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id: number) {
      this.loading = true
      this.error = null

      try {
        await userApi.deleteUser(id)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        this.error = "Failed to delete user"
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async findNearestUsers() {
      this.loading = true
      this.error = null

      const hotels: Hotel[] = [
        { name: "Hotel A", latitude: -43.9509, longitude: -34.4618 },
        { name: "Hotel B", latitude: 40.7128, longitude: -74.006 },
        { name: "Hotel C", latitude: 34.0522, longitude: -118.2437 },
        { name: "Hotel D", latitude: -25.2744, longitude: 133.7751 },
      ]

      try {
        const response = await userApi.findNearestUsersToHotels(hotels)
        this.nearestUsers = response.data
      } catch (error) {
        this.error = "Failed to find nearest users"
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})

