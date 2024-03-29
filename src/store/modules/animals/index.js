import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      animals: [
        {
          id: "a1",
          breed: "Labrador",
          age: 9,
        },
        {
          id: "a2",
          breed: "Birman",
          age: 9,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
