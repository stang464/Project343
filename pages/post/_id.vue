<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="1" shaped tile>
          <v-container>
            <v-row>
              <v-col cols="12"
                ><v-card-title>{{ res.name }}</v-card-title>
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{ res.rating }})
                </span>
                <v-rating
                  v-model="res.rating"
                  color="yellow accent-4"
                  readonly
                  half-increments
                ></v-rating>

                <v-card-subtitle v-for="(list, i) in res.address" :key="i">
                  {{ list }}</v-card-subtitle
                >
                <v-card-subtitle>{{ res.phone }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-col>
              <v-card-actions>{{ res.description }}</v-card-actions>
            </v-col>
            <v-row justify="center" align="center">
              <v-col v-for="(item, i) in res.img" :key="i" cols="12">
                <v-img :src="item" max-width="500" max-height="300"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <div v-show="not">{{ res }}</div>
    <v-card-title> Comment </v-card-title>
    <div v-if="login == true">
      <v-row>
        <v-col cols="5">login</v-col>
      </v-row>
    </div>
    <div v-if="login == false">
      <v-row>
        <v-col>
          <v-avatar><v-img :src="userdata.img"></v-img></v-avatar>
          {{ userdata.user }}</v-col
        >
      </v-row>
      <v-row>
        <v-col>
          <v-rating
            v-model="rating"
            color="yellow accent-4"
            dense
            half-increments
            hover
          ></v-rating>
          <v-file-input
            multiple
            prepend-icon="mdi-camera"
            label="เพิ่มรูป"
            @change="previewImage"
          ></v-file-input>
          <v-col class="mt-n4"><v-btn @click="upload">upload</v-btn></v-col>

          <v-textarea
            solo
            name="input-7-4"
            label="Solo textarea"
            v-model="textpost"
          ></v-textarea>
          <v-btn @click="post()">post</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="res != []">
      <div v-for="(list, i) in res.comment" :key="i">
        <v-card class="pa-2 mt-2">
          <v-row>
            <v-col>
              <v-avatar class="mr-3"
                ><v-img :src="list.avatar"></v-img>
              </v-avatar>
              {{ list.user }}
              <v-rating
                v-model="list.rate"
                color="yellow accent-4"
                half-increments
                readonly
              ></v-rating>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ list.post }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" v-for="item in list.img" :key="item">
              <v-img :src="item" class="zoom"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
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
      textpost: "",
      rating: 0,
      imageData: null,
      url: [],
      userlist: [],
      div: "",
      $url: "",
      i: 0,
      n: 0,
      review: 0,
      rate: 0,
      sum: 0,
    };
  },
  created() {
    this.getres();
  },
  computed: {
    userdata: {
      get() {
        var data = this.$nuxt.$store.state.user[0];
        return data;
      },
    },
    login: {
      get() {
        return this.$nuxt.$store.state.login;
      },
    },
  },
  methods: {
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
        });
    },
    post() {
      var text = this.textpost;
      var email = this.userdata.email;
      var time = firebase.firestore.Timestamp.now();
      var data = {
        Email: email,
        post: text,
        Timestamp: time,
        rate: this.rating,
        img: this.url,
        user: this.userdata.user,
        avatar: this.userdata.img,
      };
      db.collection("restaurant")
        .doc(this.res.name)
        .update({
          comment: firebase.firestore.FieldValue.arrayUnion(data),
          review: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          alert("สำเร็จ");
          this.calrating();
        });

      this.reset();
    },
    reset() {
      this.textpost = "";
      this.rating = 0;
    },
    previewImage(event) {
      this.url = [];
      this.imageData = event;
    },
    upload() {
      this.i = 0;
      this.n = this.imageData.length;
      for (this.i; this.i < this.n; this.i += 1) {
        const storageRef = firebase
          .storage()
          .ref(
            `restaurant/ ${this.res.name} / comment / ${
              this.imageData[this.i].name
            }`
          );
        var uploadTask = storageRef.put(this.imageData[this.i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            alert(error);
          }
        );
        firebase
          .storage()
          .ref(
            `restaurant/ ${this.res.name} / comment / ${
              this.imageData[this.i].name
            }`
          )
          .getDownloadURL()
          .then((url) => {
            this.url.push(url);
            this.url = this.url.filter(function (elem, index, self) {
              return index === self.indexOf(elem);
            });
          });
      }
    },
    getpost() {
      for (var i in this.res.comment) {
        db.collection("User")
          .where("email", "==", this.res.comment[i].Email)
          .onSnapshot((querySnapshot) => {
            /* eslint no-var: */
            var data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
            this.userlist.push(data[0]);
          });
      }
    },
    calrating() {
      var i = 0;
      var sum = 0;
      for (i in this.res.comment) {
        sum += this.res.comment[i].rate;
        console.log(sum);
      }
      this.rate = sum / this.res.review;
      db.collection("restaurant")
        .doc(this.res.name)
        .update({ rating: this.rate.toFixed(2) });
    },
  },
};
</script>

<style></style>
