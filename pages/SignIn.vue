<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="email" name="input-10-1" label="Email">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="singup">LOGIN</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    singup() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user); /* eslint-disable-line no-console */
          this.$router.push("/");
          this.$store.commit("login", false);
        })
        .catch((error) => {
          this.error = error;
          alert(error);
        });
      this.$store.commit("email", this.email);
    },
  },
};
</script>
