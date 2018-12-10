// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueFirestore from "vue-firestore";
import Firebase from "firebase";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import moment from "vue-moment";
import VueRouter from "vue-router";
import { store } from "./store/store";
import { routes } from "./router/routes";

Vue.use(VueMaterial);
Vue.config.productionTip = false;

Vue.use(VueFirestore);
Vue.use(moment);

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/sign-in");
    console.log("I was just here");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends
Firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    el: "#app",
    store: store,
    router: router,
    render: h => h(App)
  });
});
/* eslint-disable no-new */
/*new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});*/
