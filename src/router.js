import { createRouter, createWebHistory } from "vue-router";

import store from "./store";
import HomePage from "./pages/HomePage.vue";
import SignUp from "./pages/SignUp.vue";
import UserLogin from "./pages/UserLogin.vue";
import CatsPage from "./pages/CatsPage.vue";
import DogsPage from "./pages/DogsPage.vue";
import PetDetails from "./pages/PetDetails.vue";
import AdSubmission from "./pages/AdSubmission.vue";
import AccountPage from "./pages/AccountPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: HomePage },
    { path: "/sign-up", component: SignUp },
    { path: "/login", component: UserLogin },
    {
      path: "/submit-ad",
      name: "AdSubmission",
      component: AdSubmission,
    },
    {
      path: "/dogs",
      name: "Dogs",
      component: DogsPage,
      props: { animalType: "dog" },
    },
    {
      path: "/cats",
      name: "Cats",
      component: CatsPage,
      props: { animalType: "cat" },
    },
    { path: "/pet/:id", component: PetDetails, props: true },
    {
      path: "/account",
      name: "AccountPage",
      component: AccountPage,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/", redirect: "/home" },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = !!store.state.users.user;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
