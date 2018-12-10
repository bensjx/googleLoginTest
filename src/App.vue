<template>
  <div id="app">
    <nav-main></nav-main>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "app",
  methods: {
    setUser: function() {
      this.$store.dispatch("setUser");
    },
    onUserLoggedIn: function(user) {
      console.log(user);
    }
  },
  components: {
    navMain: Header
  },
  created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser();
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
</style>
