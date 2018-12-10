<template>
  <nav class="header-nav">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <ul>
          <li><router-link to="/" class="button">Home</router-link></li>
          <!---->
          <li>|</li>
          <!---->
          <li>
            <router-link to="dashboard" class="button" v-if="user"
              >Dashboard</router-link
            >
            <router-link to="sign-in" class="button" v-if="!user"
              >Sign-in</router-link
            >
          </li>
          <!---->
          <li>|</li>
          <!---->
          <li>
            <router-link to="sign-up" class="button" v-if="!user"
              >Sign-up</router-link
            >
            <a class="button" v-on:click="signOut" v-if="user">Sign-out</a>
          </li>
          <!---->
        </ul>
      </div>
      <div class="md-layout-item md-size-25">
        <img
          width="100"
          src="https://cdn-images-1.medium.com/max/1600/1*tMQzjqwzmhLS12xUUgyeKA.png"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import Firebase from "firebase";
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    signOut: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace("sign-in");
        });
    }
  }
};
</script>
<style scoped>
.header-nav {
  background-color: #448aff;
}

.md-theme-default a:not(.md-button) {
  color: #fff;
}

ul {
  margin: 0px;
  padding: 0px;
  height: 50px;
  line-height: 50px;
  // font-weight: bold;
  font-size: 18px;
}

ul > li {
  display: inline;
  padding-left: 10px;
  color: #fff;
}
</style>
