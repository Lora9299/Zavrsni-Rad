<template>

  <the-header></the-header>
  <router-view></router-view>

  <section>

    <sign-up @add-user="addUser"></sign-up>

  </section>
</template>

<script>

import TheHeader from './components/TheHeader.vue';


export default {

  components: {

    TheHeader,

  },


  data() {
    return {
      users: [
        {
          email: '',
          password: '',
          username: ''
        }
      ]

    }
  },

  methods: {
    addUser(email, password, username) {
      const newUser = {
        email: email,
        password: password,
        username: username

      };
      this.users.push(newUser);
    }
  },
};


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
</style>
