// users/mutations.js
export default {
  setUser(state, userData) {
    state.user = userData;
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  clearUser(state) {
    state.user = null;
  },
};
