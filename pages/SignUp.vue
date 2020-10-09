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
        <v-text-field v-model="user" name="input-10-1" label="User  Name">
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
        <v-btn @click="singup">Register</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import { db } from "~/plugins/firebase.js";
import "firebase/auth";
export default {
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      error: "",
      user: "",
    };
  },
  methods: {
    singup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error;
          alert(error);
        });
      /* eslint no-var: */
      var data = { email: this.email, user: this.user, favorite: [] };
      db.collection("User")
        .doc(this.email)
        .set(data)
        .then(function () {
          alert("ลงทะเบียนสำเร็จ");
        });
    },
  },
};
</script>
