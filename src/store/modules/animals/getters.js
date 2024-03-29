export default {
  animals(state) {
    return state.animals;
  },
  hasAnimals(state) {
    return state.animals && state.animals.length > 0;
  },
};
