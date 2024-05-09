import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      users: [
        {
          id: "u1",
          email: "test@mail.com",
          username: "tester",
          password: "testpass",
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
