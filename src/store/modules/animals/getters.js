export default {
  animals(state) {
    return state.animals;
  },
  animalId(state) {
    return state.animalId;
  },
  hasAnimals(state) {
    return state.animals && state.animals.length > 0;
  },
};
