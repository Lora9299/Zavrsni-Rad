export default {
  submitAd(state, payload) {
    state.animals.push(payload);
  },
  setAnimals(state, payload) {
    state.animals = payload;
  },
};
