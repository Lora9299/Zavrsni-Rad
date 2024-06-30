import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { mapActions } from "vuex";

export default {
  ...mapActions("animals", ["deleteAnimal"]),

  async signUp({ commit }, { email, password, username }) {
    commit("setLoading", true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        throw new Error("Username already exists.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      commit("setUser", { uid: user.uid, email, username });
    } catch (error) {
      commit("setError", error.message || "Failed to sign up, try later.");
    } finally {
      commit("setLoading", false);
    }
  },

  async login({ commit }, { email, password }) {
    commit("setLoading", true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        commit("setUser", {
          uid: user.uid,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profilePicture || "",
          location: userData.location,
          contact: userData.contact,
        });
      } else {
        throw new Error("User data not found in Firestore");
      }
    } catch (error) {
      commit("setError", error.message || "Failed to log in, try later.");
    } finally {
      commit("setLoading", false);
    }
  },

  async logout({ commit }) {
    const auth = getAuth();
    await signOut(auth);
    commit("clearUser");
  },

  async deleteAccount({ commit, getters, dispatch }) {
    commit("setLoading", true);
    const db = getFirestore();
    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;
    const userId = getters.user.uid;

    try {
      const subcollections = ["cats", "dogs"];
      const deletePromises = [];

      for (const subcollection of subcollections) {
        const animalsQuery = query(
          collection(db, "animals", "animalData", subcollection),
          where("userId", "==", userId)
        );
        const animalsSnapshot = await getDocs(animalsQuery);

        for (const animalDoc of animalsSnapshot.docs) {
          const animalData = animalDoc.data();
          const animalId = animalDoc.id;
          const animalType = animalData.type;

          deletePromises.push(
            dispatch(
              "deleteAnimal",
              { id: animalId, type: animalType },
              { root: true }
            )
          );

          if (animalData.images && animalData.images.length) {
            const imageDeletePromises = animalData.images.map((imagePath) => {
              const imageRef = ref(storage, imagePath);
              return deleteObject(imageRef);
            });
            deletePromises.push(...imageDeletePromises);
          }
        }
      }

      await Promise.all(deletePromises);

      await deleteDoc(doc(db, "users", userId));

      await deleteUser(user);

      await signOut(auth);
      commit("clearUser");
    } catch (error) {
      commit(
        "setError",
        error.message || "Failed to delete the account, try later."
      );
      console.error("Failed to delete the account:", error);
    } finally {
      commit("setLoading", false);
    }
  },

  async uploadProfilePicture({ commit, getters }, image) {
    commit("setLoading", true);
    const db = getFirestore();
    const storage = getStorage();
    const userId = getters.user.uid;
    const storageRef = ref(storage, `profilePictures/${userId}/${image.name}`);

    try {
      // Upload the file to storage
      await uploadBytes(storageRef, image);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user document with the profile picture URL
      await updateDoc(doc(db, "users", userId), {
        profilePicture: downloadURL,
      });

      // Commit the update to the Vuex store
      commit("setProfilePicture", downloadURL);
    } catch (error) {
      commit(
        "setError",
        error.message || "Failed to upload profile picture, try later."
      );
      console.error("Error uploading profile picture:", error);
    } finally {
      commit("setLoading", false);
    }
  },

  async updateUserData({ commit, state }, payload) {
    const db = getFirestore();
    const userRef = doc(db, "users", state.user.uid);
    try {
      await updateDoc(userRef, payload);
      commit("setUser", { ...state.user, ...payload });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async fetchUserData({ commit }) {
    commit("setLoading", true);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        commit("setUser", {
          uid: user.uid,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profilePicture || "",
          contact: userData.contact || "",
          location: userData.location || "",
        });
      } else {
        throw new Error("User data not found in Firestore");
      }
    } catch (error) {
      commit(
        "setError",
        error.message || "Failed to fetch user data, try later."
      );
    } finally {
      commit("setLoading", false);
    }
  },

  async fetchUserById({ commit }, userId) {
    const db = getFirestore();
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        commit("setUserById", { userId, userData });
        return userData;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },
};
