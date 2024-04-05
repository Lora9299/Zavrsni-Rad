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
          title: "Dog for Sale",
          type: "Dog",
          gender: "Female",
          breed: "Labrador",
          age: 9,
          price: 4000,
        },
        {
          id: "a2",
          title: "Cat for Sale",
          type: "Cat",
          gender: "Male",
          breed: "Birman",
          age: 9,
          price: 4000,
        },
        {
          id: "a3",
          title: "Dog for Sale",
          type: "Dog",
          gender: "Female",
          breed: "Border Collie",
          age: 4,
          price: 4000,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
