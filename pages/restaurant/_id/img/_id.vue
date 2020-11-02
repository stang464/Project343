<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-row>
    <v-card>
      <v-row class="pa-5">
        <v-col cols="12">
          <h3>รูปทั้งหมดของร้าน {{ res.name }}</h3>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col v-for="n in img" :key="n" class="d-flex child-flex" cols="4">
          <v-img :src="n" class="rounded" aspect-ratio="1"></v-img>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-5">
      <v-row class="pa-5">
        <v-col cols="12">
          <h3>รูปทั้งหมดจากรีวิวของร้าน {{ res.name }}</h3>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col
          v-for="n in imgComment"
          :key="n"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img :src="n" class="rounded"></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      items: [
        {
          text: "หน้าแรก",
          disabled: false,
          to: "/",
        },
        {
          text: this.$route.params.id,
          disabled: false,
          to: `/restaurant/${this.$route.params.id}`,
        },
        {
          text: "รูปทั้งหมดของร้าน",
          disabled: true,
          to: `/restaurant/${this.$route.params.id}`,
        },
      ],
      res: [],
      img: [],
      imgComment: [],
    };
  },
  async created() {
    await this.getres();
  },
  methods: {
    getres() {
      console.log(this.$route.params.id);
      db.collection("restaurant")
        .where("name", "==", this.$route.params.id)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.res = data[0];
          this.img = data[0].img;
          this.getcommentImg();
        });
    },
    getcommentImg() {
      var arr = [];
      var i = 0;
      for (i in this.res.comment) {
        var y = 0;
        for (y in this.res.comment[i].img) {
          arr.push(this.res.comment[i].img[y]);
        }
      }
      this.imgComment = arr;
      console.log(this.imgComment);
    },
  },
};
</script>

<style></style>
