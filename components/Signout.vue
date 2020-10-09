<template>
  <nuxt-link to="/">Sign Out</nuxt-link>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  methods: {
    signout() {
      firebase.auth().signOut();
    },
  },
};
</script>
