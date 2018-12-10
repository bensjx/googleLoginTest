<template>
  <section class="section">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">Sign-in</div>
          <div class="md-subhead">Please sign-in to your account</div>
        </md-card-header>

        <md-card-content>
          <form v-on:submit.prevent>
            <md-field md-clearable>
              <label>jon.doe@email.com</label>
              <md-input v-model="email"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
            <md-button
              type="submit"
              class="button is-primary"
              v-on:click="signIn"
            >
              Sign-in
            </md-button>
            <button
              v-google-signin-button="clientId"
              class="google-signin-button"
            >
              Continue with Google
            </button>
          </form>
        </md-card-content>
      </md-ripple>
    </md-card>
  </section>
</template>

<script>
import Firebase from "firebase";
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  data: function() {
    return {
      email: "",
      password: "",
      clientId:
        "229904947910-8omu7q89cn438dr41ogbnqgod3o8dpd5.apps.googleusercontent.com"
    };
  },
  methods: {
    signIn: function() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("dashboard");
          },
          error => {
            alert(error.message);
          }
        );
    },
    OnGoogleAuthSuccess: function(idToken) {
      alert("pass");
    },
    OnGoogleAuthFail: function(error) {
      alert("Error: " + error.error);
    }
  }
};
</script>

<style scoped>
.md-card {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
