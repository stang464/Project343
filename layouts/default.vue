<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/" class="text-decoration: none"
        ><v-toolbar-title v-text="title"
      /></nuxt-link>
      <v-spacer />
      <v-col cols="5">
        <nuxt-link to="/forms">
          <v-btn>Forms</v-btn>
        </nuxt-link>
      </v-col>
      <v-col cols="auto">
        <v-btn v-show="login" to="/SignUp">SIGN UP</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn v-show="!login" to="/profile">PROFILE</v-btn>
        <v-btn v-show="login" to="/SignIn">Login</v-btn>
        <v-btn v-if="!login" @click="signOut">Sign Out</v-btn>
      </v-col>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
require("firebase/auth");
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Food Center",
    };
  },
  computed: {
    login: {
      get() {
        return this.$nuxt.$store.state.login;
      },
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);
          this.$store.commit("login", true);
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
