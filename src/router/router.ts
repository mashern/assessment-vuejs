import { createRouter, createWebHistory } from "vue-router"
import UserList from "../components/UserList.vue"
import NearestUserList from "../components/NearestUserList.vue"

const routes = [
  {
    path: "/",
    name: "Users",
    component: UserList,
  },
  {
    path: "/nearest",
    name: "NearestUsers",
    component: NearestUserList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

