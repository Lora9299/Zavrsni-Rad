<template>

  <main>
    <the-header></the-header>
    <router-view></router-view>
  </main>

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

};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
</style>
