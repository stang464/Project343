<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/" class="text-decoration: none"
        ><v-toolbar-title v-text="title"
      /></nuxt-link>
      <v-spacer />
      <v-col v-show="login" cols="auto">
        <v-btn v-show="login" to="/SignUp">SIGN UP</v-btn>
        <v-btn v-show="login" to="/SignIn">Login</v-btn>
      </v-col>
      <v-col v-if="isMobile && !login" cols="auto">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              text
              v-bind="attrs"
              v-on="on"
              class="pa-0 rounded-pill"
            >
              <v-avatar size="37"><v-img :src="user.img"></v-img></v-avatar>
              <div class="ml-1">{{ user.user }}</div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn text block to="/profile" class="pa-0">Profile</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user.auth >= 2">
              <v-list-item-title>
                <v-btn text block to="/forms" class="pa-0">เพิ่มร้าน</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user.auth >= 2">
              <v-list-item-title>
                <v-btn text block to="/manageRestaurant" class="pa-0"
                  >จัดการร้าน</v-btn
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user.auth == 3">
              <v-list-item-title>
                <v-btn text block to="/admin" class="pa-0">admin</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <v-btn text block to="/" color="red" @click="signOut"
                  >signOut</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
    user: {
      get() {
        return this.$nuxt.$store.state.user[0];
      },
    },
  },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
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
