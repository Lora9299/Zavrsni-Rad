<template>
  <header>
    <nav>
      <ul class="logo">
        <router-link to="/home"><img src="/dogcat.png" alt="Cat and Dog Logo"
            style="width: 50px; height: auto;"></router-link>
      </ul>
      <ul class="middle">
        <li>
          <img src="/cat.png" alt="Cat" style="width: 25px; height: auto;">
          <router-link to="/cats">CATS</router-link>
        </li>
        <li>
          <img src="/dog2.png" alt="Dog" style="width: 25px; height: auto;">
          <router-link to="/dogs">DOGS</router-link>
        </li>
      </ul>
      <ul class="login">
        <li>
          <font-awesome-icon icon="user" class="user-icon" />
          <router-link to="/login">LOGIN</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {

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

.user-icon {
  margin-right: 8px;
}

.login {
  margin-left: auto;
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
</style>