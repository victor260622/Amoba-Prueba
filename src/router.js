import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/home-page.vue";
import LoginPage from "./components/login-page.vue";

// lazy-loaded
// const Profile = () => import("./components/Profile.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;