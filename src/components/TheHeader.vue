<template>
  <header>
    <nav>
      <ul class="logo">
        <router-link to="/home"><img src="/dogcat.png" alt="Cat and Dog Logo"
            style="width: 50px; height: auto;"></router-link>
        <li><router-link to="/home">HOME</router-link></li>
      </ul>
      <ul class="middle">
        <li class="cat-link">
          <img src="/cat.png" alt="Cat" class="me-1" style="width: 25px; height: auto;">
          <router-link to="/cats">CATS</router-link>
        </li>
        <li class="dog-link">
          <img src="/dog2.png" alt="Dog" style="width: 25px; height: auto;">
          <router-link to="/dogs">DOGS</router-link>
        </li>
      </ul>
      <ul class="submit-ad">
        <li v-if="isAuthenticated">
          <router-link to="/submit-ad">SUBMIT AD</router-link>
        </li>
      </ul>

      <ul class="authenticated" v-if="isAuthenticated">

        <li><router-link :to="{ name: 'AccountPage' }">
            <div class="profile-picture-container">
              <div class="profile-picture">
                <img :src="profilePicture" alt="Profile Picture" />
              </div>
            </div>{{ username }}
          </router-link></li>
      </ul>

      <ul class="login">
        <li v-if="!isAuthenticated">
          <font-awesome-icon icon="user" class="user-icon" />
          <router-link to="/login">LOGIN</router-link>
        </li>
        <li v-else>
          <font-awesome-icon icon="user" class="user-icon" />
          <button @click="logoutUser">LOG OUT</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { auth } from '@/firebase.js';
export default {
  computed: {
    ...mapGetters('users', ['isAuthenticated', 'user']),
    username() {
      return this.user ? this.user.username : '';
    },
    profilePicture() {
      return this.user ? this.user.profilePicture : "";
    },
  },
  methods: {
    ...mapActions('users', ['logout']),
    async logoutUser() {
      try {
        await auth.signOut();
        this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  }
};
</script>

<style scoped>
header {
  font-family: 'Roboto Condensed';
  font-size: large;
  width: 100%;
  height: 4rem;
  background-color: #AFC2AE;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  padding-top: 1rem;
  margin: 2rem;
  display: flex;
  align-items: center;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
}

.logo {
  margin-right: auto;
}

.middle {
  margin-right: auto;
  margin-left: auto;
}

.cat-link {
  margin-right: 100px;
}

.submit-ad {
  padding-left: 40px;
}

.user-icon {
  margin-right: 8px;
}

.login {
  margin-left: 150px;
}

ul li {
  margin: 1rem;
  position: relative;
  padding: 4px;
}

ul li::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background-color: black;
  transition: width 0.3s;
}

ul li:hover::before {
  width: 100%;
}

a {
  color: black;
  text-decoration: none;
}

a:active,
a:hover,
router-link-active {
  color: black;
  text-decoration: none;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.authenticated {
  padding-left: 50px;
}

p {
  margin: 1rem;
  position: relative;
  padding: 4px;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.profile-picture-container {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
