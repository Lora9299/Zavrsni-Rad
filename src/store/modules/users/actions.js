// users/actions.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
} from "firebase/firestore";

export default {
  async signUp({ commit }, { email, password, username }) {
    commit("setLoading", true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      // Check if the username already exists
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        throw new Error("Username already exists.");
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      // Commit user data to the state
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
};
