// animals/index.js
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      dogs: [],
      cats: [],
      adoptableFilter:
        JSON.parse(localStorage.getItem("adoptableFilter")) || true,
    };
  },
  mutations,
  getters,
  actions,
};
