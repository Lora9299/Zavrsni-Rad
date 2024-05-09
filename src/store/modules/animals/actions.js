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
      `https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app/animals/${animalId}}.json`,
      {
        method: "POST",
        body: JSON.stringify(animalData),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      //error...
    }

    context.commit("submitAd", {
      ...animalData,
      id: animalId,
    });
  },
};
