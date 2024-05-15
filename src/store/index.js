import { createStore } from "vuex";

import animalsModule from "./modules/animals/index.js";
import usersModule from "./modules/users/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    animals: animalsModule,
    users: usersModule,
    auth: authModule,
  },
});

export default store;
