import { createStore } from "vuex";

import animalsModule from "./modules/animals/index.js";
import usersModule from "./modules/users/index.js";

const store = createStore({
  modules: {
    animals: animalsModule,
    users: usersModule,
  },
});

export default store;
