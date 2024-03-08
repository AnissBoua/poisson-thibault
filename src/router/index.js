import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@/views/auth.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/turnover",
      name: "turnover",
      component: () => import("../views/Turnover.vue"),
    },
  ],
});

export default router;
