import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@/views/auth.vue";
import Register from "@/views/Register.vue";

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
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const noLogedPath = ["/register", "/auth"];
  if (noLogedPath.includes(to.path)) {
    next();
    return;
  }
  if (!localStorage.getItem("token")) {
    next("/auth");
    return;
  }
  next();
});

export default router;
