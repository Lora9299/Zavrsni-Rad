<template>

  <main>
    <the-header></the-header>
    <router-view></router-view>
  </main>

  <!-- <section>

    <sign-up @add-user="addUser"></sign-up>

  </section> -->

  <the-footer></the-footer>

</template>

<script>

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {

  components: {

    TheHeader,
    TheFooter,

  },

  // data() {
  //   return {
  //     users: [
  //       {
  //         email: '',
  //         password: '',
  //         username: ''
  //       }
  //     ]

  //   }
  // },

  // methods: {
  //   addUser(email, password, username) {
  //     const newUser = {
  //       email: email,
  //       password: password,
  //       username: username

  //     };
  //     this.users.push(newUser);
  //   }
  // },
};


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
</style>
