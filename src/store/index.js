import { createStore } from "vuex";

import animalsModule from "./modules/animals/index.js";

const store = createStore({
  modules: {
    animals: animalsModule,
  },
});

export default store;
