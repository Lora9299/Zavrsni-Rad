export default {
  async signUp(context, data) {
    const userId = context.rootGetters.userId;
    const userData = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    const response = await fetch(
      `https://zavrsni-6304b-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
      {
        method: "PUT", // PUT is for letting only 1 entry into the database, POST is for more than 1 entry
        body: JSON.stringify(userData),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit("signUp", {
      ...userData,
      id: userId,
    });
  },
};
