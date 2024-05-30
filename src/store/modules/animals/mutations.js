export default {
  setDogs(state, dogs) {
    state.dogs = dogs;
  },

  setCats(state, cats) {
    state.cats = cats;
  },

  addDog(state, dog) {
    state.dogs.push(dog);
  },

  addCat(state, cat) {
    state.cats.push(cat);
  },

  updateDog(state, updatedDog) {
    const index = state.dogs.findIndex((dog) => dog.id === updatedDog.id);
    if (index !== -1) {
      state.dogs.splice(index, 1, updatedDog);
    }
  },

  updateCat(state, updatedCat) {
    const index = state.cats.findIndex((cat) => cat.id === updatedCat.id);
    if (index !== -1) {
      state.cats.splice(index, 1, updatedCat);
    }
  },

  setAdoptableFilter(state, value) {
    state.adoptableFilter = value;
    localStorage.setItem("adoptableFilter", JSON.stringify(value));
  },

  removeDog(state, id) {
    state.dogs = state.dogs.filter((dog) => dog.id !== id);
  },

  removeCat(state, id) {
    state.cats = state.cats.filter((cat) => cat.id !== id);
  },
};
