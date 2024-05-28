export default {
  dogs: (state) => state.dogs,
  cats: (state) => state.cats,

  getAnimalById: (state) => (id) => {
    return (
      state.dogs.find((animal) => animal.id === id) ||
      state.cats.find((animal) => animal.id === id)
    );
  },
  hasAnimals: (state) => state.dogs.length > 0 || state.cats.length > 0,
  adoptableFilter: (state) => state.adoptableFilter,
};
