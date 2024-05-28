// users/getters.js
export default {
  user(state) {
    return state.user;
  },
  error(state) {
    return state.error;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
};
