import { db, storage } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default {
  async addAnimal({ commit }, animal) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const imageUploads = animal.images.map(async (image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image.file);
        const url = await getDownloadURL(storageRef);
        return url;
      });

      const imageUrls = await Promise.all(imageUploads);

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

      const parentDocRef = doc(db, "animals", "animalData");
      const subcollectionPath = animal.type === "dog" ? "dogs" : "cats";
      const subcollectionRef = collection(parentDocRef, subcollectionPath);
      const docRef = await addDoc(subcollectionRef, animalData);

      const newAnimal = { id: docRef.id, ...animalData };
      commit(animal.type === "dog" ? "addDog" : "addCat", newAnimal);

      return newAnimal;
    } catch (error) {
      console.error("Error adding animal:", error.message);
      throw error;
    }
  },

  async updateAnimal({ commit }, animal) {
    try {
      if (!animal.id) {
        throw new Error("Animal ID is not provided");
      }

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const newImages = animal.images.filter((image) => image.file);
      const existingImages = animal.images.filter((image) => !image.file);

      const imageUrls = existingImages.map((image) => image);
      if (newImages.length > 0) {
        const imageUploads = newImages.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image.file);
          const url = await getDownloadURL(storageRef);
          return url;
        });

        const uploadedImageUrls = await Promise.all(imageUploads);
        imageUrls.push(...uploadedImageUrls);
      }

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

      const parentDocRef = doc(db, "animals", "animalData");
      const subcollectionPath = animal.type === "dog" ? "dogs" : "cats";
      const animalDocRef = doc(parentDocRef, subcollectionPath, animal.id);
      await updateDoc(animalDocRef, animalData);

      const updatedAnimal = { id: animal.id, ...animalData };
      commit(animal.type === "dog" ? "updateDog" : "updateCat", updatedAnimal);

      return updatedAnimal;
    } catch (error) {
      console.error("Error updating animal:", error.message);
      throw error;
    }
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

  async deleteAnimal({ commit }, { id, type }) {
    try {
      const parentDocRef = doc(db, "animals", "animalData");
      let subcollectionPath = "cats";
      if (type === "dog") {
        subcollectionPath = "dogs";
      }

      const animalDocRef = doc(parentDocRef, subcollectionPath, id);
      await deleteDoc(animalDocRef);

      if (type === "dog") {
        commit("removeDog", id);
      } else if (type === "cat") {
        commit("removeCat", id);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
      throw error;
    }
  },
};
