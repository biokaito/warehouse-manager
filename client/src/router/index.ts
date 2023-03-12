import auth from "@/middleware/auth";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: () => auth({ router }),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

// router.beforeEach(async (to, from) => {
//   if (!localStorage.getItem("jwt")) {
//     return { name: "Login" };
//   }
// });

export default router;
