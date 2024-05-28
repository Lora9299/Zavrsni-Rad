// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getFirestore } from "firebase/firestore";
// // import { getAuth } from "firebase/auth";
// // import {
// //   query,
// //   setDoc,
// //   doc,
// //   getDatabase,
// //   ref,
// //   orderByChild,
// //   equalTo,
// //   get,
// // } from "firebase/database";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // const firebaseConfig = {
// //   apiKey: "AIzaSyDkBVZmjdLVNOpCcQscqUGjifqdjOsm45A",
// //   authDomain: "zavrsni-6304b.firebaseapp.com",
// //   databaseURL:
// //     "https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app",
// //   projectId: "zavrsni-6304b",
// //   storageBucket: "zavrsni-6304b.appspot.com",
// //   messagingSenderId: "821793819088",
// //   appId: "1:821793819088:web:70f949352ad45c147691d5",
// // };

// // const app = initializeApp(firebaseConfig);

// // const db = getFirestore(app);

// // const auth = getAuth(app);

// // export { db, auth };

// export default {
//   login() {},

//   async checkIfEmailExists(context, email) {
//     const db = getDatabase();
//     const emailQuery = query(
//       ref(db, "users"),
//       orderByChild("email"),
//       equalTo(email)
//     );
//     const snapshot = await get(emailQuery);
//     return snapshot.exists();
//   },
//   async checkIfUsernameExists(context, username) {
//     const db = getDatabase();
//     const usernameQuery = query(
//       ref(db, "users"),
//       orderByChild("username"),
//       equalTo(username)
//     );
//     const snapshot = await get(usernameQuery);
//     return snapshot.exists();
//   },

//   async signUp(context, payload) {
//     const userId = context.rootGetters.userId;

//     const emailExists = await context.dispatch(
//       "checkIfEmailExists",
//       payload.email
//     );
//     const usernameExists = await context.dispatch(
//       "checkIfUsernameExists",
//       payload.username
//     );

//     if (emailExists) {
//       throw new Error("Email already exists.");
//     }

//     if (usernameExists) {
//       throw new Error("Username already exists.");
//     }

//     const response = await fetch(
//       `https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email: payload.email,
//           password: payload.password,
//           username: payload.username,
//           returnSecureToken: true,
//         }),
//       }
//     );
//     const responseData = await response.json();
//     if (!response.ok) {
//       console.log(responseData);
//       const error = new Error(
//         responseData.message || "Failed to authenticate."
//       );
//       throw error;
//     }
//     console.log();
//     context.commit("setUser", {
//       token: responseData.idToken,
//       userId: responseData.localId,
//       tokenExpiration: responseData.expiresIn,
//     });

//     const userData = {
//       email: payload.email,
//       username: payload.username,
//     };

//     const db = getFirestore(); // Assuming you have initialized Firestore elsewhere
//     await setDoc(doc(db, "users", responseData.localId), userData);
//   },
// };
