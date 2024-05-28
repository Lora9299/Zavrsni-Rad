import { db, storage } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default {
  async addAnimal({ commit }, animal) {
    return new Promise((resolve, reject) => {
      const addAnimalAsync = async () => {
        try {
          if (!animal.images || animal.images.length === 0) {
            throw new Error("No images provided");
          }

          // Get the current user's ID
          const auth = getAuth();
          const user = auth.currentUser;
          if (!user) {
            throw new Error("User is not authenticated");
          }

          // Upload images and get their download URLs
          const imageUploads = animal.images.map(async (image) => {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
          });

          const imageUrls = await Promise.all(imageUploads);

          // Prepare the animal data to be saved
          const animalData = {
            title: animal.title,
            adoptable: animal.adoptable,
            type: animal.type,
            gender: animal.gender,
            breed: animal.breed,
            age: animal.age,
            months: animal.months,
            years: animal.years,
            price: animal.price,
            description: animal.description,
            location: animal.location,
            contact: animal.contact,
            userId: user.uid,
            images: imageUrls,
          };

          console.log("Entered data:", animalData);

          // Determine the subcollection path based on the animal type
          const parentDocRef = doc(db, "animals", "animalData"); // Parent document under 'animals'
          let subcollectionPath = "cats";
          if (animal.type === "dog") {
            subcollectionPath = "dogs";
          }

          // Add the animal data to the appropriate subcollection
          const subcollectionRef = collection(parentDocRef, subcollectionPath);
          const docRef = await addDoc(subcollectionRef, animalData);

          // Create the new animal object with its document ID
          const newAnimal = { id: docRef.id, ...animalData };

          // Commit the new animal to the store
          if (animal.type === "dog") {
            commit("addDog", newAnimal);
          } else if (animal.type === "cat") {
            commit("addCat", newAnimal);
          }

          resolve(newAnimal);
        } catch (error) {
          console.error("Error adding animal:", error.message);
          reject(error);
        }
      };

      addAnimalAsync();
    });
  },

  async updateAnimal({ commit }, animal) {
    return new Promise((resolve, reject) => {
      const updateAnimalAsync = async () => {
        try {
          if (!animal.id) {
            throw new Error("Animal ID is not provided");
          }

          // Get the current user's ID
          const auth = getAuth();
          const user = auth.currentUser;
          if (!user) {
            throw new Error("User is not authenticated");
          }

          // Upload new images and get their download URLs if there are any new images
          const imageUrls = [];
          if (animal.images && animal.images.length > 0) {
            const imageUploads = animal.images.map(async (image) => {
              if (image.file) {
                // Check if the image is a File object
                const storageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(storageRef, image.file);
                return getDownloadURL(storageRef);
              }
              return image.url; // Existing image URL
            });

            imageUrls.push(...(await Promise.all(imageUploads)));
          }

          // Prepare the updated animal data
          const animalData = {
            title: animal.title,
            adoptable: animal.adoptable,
            type: animal.type,
            gender: animal.gender,
            breed: animal.breed,
            age: animal.age,
            months: animal.months,
            years: animal.years,
            price: animal.price,
            description: animal.description,
            location: animal.location,
            contact: animal.contact,
            userId: user.uid,
            images:
              imageUrls.length > 0
                ? imageUrls
                : animal.images.map((img) => img.url), // Use new URLs if available
          };

          console.log("Updated data:", animalData);

          // Determine the subcollection path based on the animal type
          const parentDocRef = doc(db, "animals", "animalData");
          let subcollectionPath = "cats";
          if (animal.type === "dog") {
            subcollectionPath = "dogs";
          }

          // Update the animal data in the appropriate subcollection
          const animalDocRef = doc(parentDocRef, subcollectionPath, animal.id);
          await updateDoc(animalDocRef, animalData);

          // Commit the updated animal to the store
          const updatedAnimal = { id: animal.id, ...animalData };
          if (animal.type === "dog") {
            commit("updateDog", updatedAnimal);
          } else if (animal.type === "cat") {
            commit("updateCat", updatedAnimal);
          }

          resolve(updatedAnimal);
        } catch (error) {
          console.error("Error updating animal:", error.message);
          reject(error);
        }
      };

      updateAnimalAsync();
    });
  },

  async loadAnimals({ commit }) {
    try {
      const animalDataDocRef = doc(db, "animals", "animalData");

      const catsSnapshot = await getDocs(collection(animalDataDocRef, "cats"));
      const dogsSnapshot = await getDocs(collection(animalDataDocRef, "dogs"));

      const cats = catsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const dogs = dogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      commit("setCats", cats);
      commit("setDogs", dogs);
    } catch (error) {
      console.error("Error loading animals:", error.message);
    }
  },

  setAdoptableFilter({ commit }, filter) {
    commit("setAdoptableFilter", filter);
  },
};
