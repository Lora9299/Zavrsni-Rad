export default {
  async submitAd(context, data) {
    const animalId = context.rootGetters.animalId;
    const animalData = {
      title: data.title,
      adoptable: data.adoptable,
      type: data.type,
      gender: data.gender,
      breed: data.breed,
      age: data.age,
      months: data.months,
      years: data.years,
      price: data.price,
      description: data.desc,
      location: data.location,
      contact: data.contact,
      images: data.images,
    };

    const response = await fetch(
      `https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app/animals/${animalId}.json`,
      {
        method: "POST",
        body: JSON.stringify(animalData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to submit!");
      throw error;
    }

    context.commit("submitAd", {
      ...animalData,
      id: animalId,
    });
  },

  async loadAnimals(context) {
    const response = await fetch(
      `https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app/animals.json`
    );
    const responseData = await response.json();
    console.log("Response Data:", responseData);
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch data!");
      throw error;
    }

    const animals = [];

    for (const outerKey in responseData) {
      const outerAnimalData = responseData[outerKey];
      for (const innerKey in outerAnimalData) {
        const animalData = outerAnimalData[innerKey];
        const animal = {
          id: innerKey, // Use the innerKey as the animal's ID
          title: animalData.title,
          adoptable: animalData.adoptable,
          type: animalData.type,
          gender: animalData.gender,
          breed: animalData.breed,
          age: animalData.age,
          months: animalData.months,
          years: animalData.years,
          price: animalData.price,
          description: animalData.description,
          location: animalData.location,
          contact: animalData.contact,
          images: animalData.images,
        };
        animals.push(animal);
      }
    }

    console.log("ANIMALS:", animals);

    context.commit("setAnimals", animals);
  },
};
