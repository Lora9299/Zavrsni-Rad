import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import SignUp from "./pages/SignUp.vue";
import UserLogin from "./pages/UserLogin.vue";
import CatsPage from "./pages/CatsPage.vue";
import DogsPage from "./pages/DogsPage.vue";
import PetDetails from "./pages/PetDetails.vue";
import AdSubmission from "./pages/AdSubmission.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: HomePage },
    { path: "/sign-up", component: SignUp },
    { path: "/login", component: UserLogin },
    { path: "/submit-ad", component: AdSubmission },
    { path: "/dogs", component: DogsPage },
    { path: "/pet/:id", component: PetDetails, props: true },
    { path: "/cats", component: CatsPage },
    { path: "/", redirect: "/home" },
  ],
});

export default router;
