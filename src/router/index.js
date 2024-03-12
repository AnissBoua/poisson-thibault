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
      path: "/produit/:id",
      name: "produit",
      component: () => import("../views/Produit.vue"),
    },
    {
      path: "/produit/:id/edit",
      name: "produit-edit",
      component: () => import("../views/forms/Produit.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
  ],
});

export default router;
