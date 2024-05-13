import { createStore } from "vuex";

import animalsModule from "./modules/animals/index.js";
import usersModule from "./modules/users/index.js";

const store = createStore({
  modules: {
    animals: animalsModule,
    users: usersModule,
  },
  state() {
    return {
      animalId: "a5",
      userId: "u2",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    animalId(state) {
      return state.animalId;
    },
  },
});

export default store;
