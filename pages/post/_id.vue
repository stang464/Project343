<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="1" shaped tile>
          <v-container>
            <v-row>
              <v-col cols="12"
                ><v-card-title>{{ tmp.title }}</v-card-title>
                <v-card-subtitle v-for="(list, i) in tmp.add" :key="i">
                  {{ list }}</v-card-subtitle
                >
                <v-card-subtitle>{{ tmp.phone }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-col>
              <v-card-actions>{{ tmp.description }}</v-card-actions>
            </v-col>
            <v-row justify="center" align="center">
              <v-col v-for="(item, i) in tmp.img" :key="i" cols="12">
                <v-img :src="item" max-width="500" max-height="300"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <div v-show="not">{{ $res }} {{ tmp }}</div>
  </v-container>
</template>

<script>
import { db } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      name: this.$route.params.id,
      res: [],
      not: false,
      title: "",
      add: [],
      list: null,
    };
  },
  computed: {
    $res: {
      get() {
        this.getres();
        return this.res;
      },
    },
    tmp: {
      get() {
        this.getres();
        this.setdata();
        return this.list;
      },
    },
  },
  methods: {
    setdata() {
      this.list = {
        title: this.$res.name,
        phone: this.$res.phone,
        open: this.$res.open,
        close: this.$res.close,
        description: this.$res.description,
        genre: this.$res.genre,
        img: this.$res.img,
        add: this.$res.address,
      };
    },
    getres() {
      db.collection("restaurant")
        .where("name", "==", this.name)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.res = data[0];
          // console.log(this.res);
        });
    },
  },
};
</script>

<style></style>
