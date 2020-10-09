<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ user.user }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <h2>ร้านโปรด</h2>
        <v-card>
          <v-col>
            <v-list>
              <v-list v-for="item in user.favorite" :key="item">
                <nuxt-link :to="{ name: 'post-id', params: { id: item } }">{{
                  item
                }}</nuxt-link></v-list
              >
            </v-list>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    email: {
      get() {
        return this.$nuxt.$store.state.email;
      },
    },
    user: {
      get() {
        this.getdata();
        return this.list;
      },
    },
  },

  methods: {
    getdata() {
      db.collection("User")
        .where("email", "==", this.email)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.list = Object.values(data);
          this.list = this.list[0];
        });
    },
  },
};
</script>

<style></style>
