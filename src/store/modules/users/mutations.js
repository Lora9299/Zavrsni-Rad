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
  setUserById(state, { userId, userData }) {
    state.users = {
      ...state.users,
      [userId]: userData,
    };
  },

  setProfilePicture(state, url) {
    if (state.user) {
      state.user.profilePicture = url;
    }
  },

  setContactLocation(state, { contact, location }) {
    if (state.user) {
      state.user.contact = contact;
      state.user.location = location;
    }
  },

  clearUser(state) {
    state.user = null;
  },
};
