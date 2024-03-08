import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@/views/auth.vue";
import { authGuard } from "@/_helpers/auth-guard";

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
      path: "/turnover",
      name: "turnover",
      component: () => import("../views/Turnover.vue"),
    },
  ],
});

export default router;
