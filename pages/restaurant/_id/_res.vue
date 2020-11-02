<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-row>
    <v-card>
      <v-row class="pa-5">
        <v-col cols="12" class="d-inline-flex pb-0">
          <div>
            <h3>{{ res.name }}</h3>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  icon
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="genlink()"
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <ShareNetwork
                    network="facebook"
                    :url="`https://project-cs343-cs313.web.app/post/${link}`"
                    :title="res.name"
                  >
                    Facebook
                  </ShareNetwork>
                </v-list-item>
                <v-list-item>
                  <ShareNetwork
                    network="twitter"
                    :url="`https://project-cs343-cs313.web.app/post/${link}`"
                    :title="res.name"
                  >
                    Twitter
                  </ShareNetwork>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div>
            <v-btn medium icon @click="addfev(index)">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col class="pt-0 pb-0">
          <div class="d-inline-flex">
            <div>
              <span style="font-size: 14px">
                ({{ res.rating }}) {{ res.review }} รีวิว
              </span>
            </div>
            <div>
              <v-rating
                class="mb-2"
                background-color="grey lighten-2"
                color="warning"
                readonly
                half-increments
                length="5"
                size="16"
                :value="res.rating"
              ></v-rating>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="pt-0">
          <div>เปิด {{ res.open }} ถึง {{ res.close }}</div>
        </v-col>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12 pb-0">
          <div><h4>สถานที่และเส้นทาง</h4></div>
        </v-col>
        <v-col cols="12" class="d-inline-flex pt-0">
          <div><v-icon color="red">mdi-map-marker</v-icon></div>
          <div>
            {{ address.add }} {{ address.sub_district }} {{ address.district }}
            {{ address.province }}
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              outlined
              :href="`https://www.google.com/maps/dir//${res.name}+${address.sub_district}+${address.district}`"
              target="blank"
            >
              ดูเส้นทาง
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="pt-0 pb-0">
          <h4>โทร</h4>
        </v-col>
        <v-col cols="12" class="d-inline-flex">
          <div class="mr-1">
            <v-icon>mdi-phone</v-icon>
          </div>
          <div>
            <a> {{ res.phone }}</a>
          </div>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col v-for="n in 2" :key="n" class="d-flex child-flex" md="4" sm="4">
          <v-img :src="img[n - 1]" class="rounded"></v-img>
        </v-col>
        <v-col class="d-flex child-flex" md="4" sm="4">
          <v-img v-if="img.length > 2" :src="img[2]" class="rounded">
            <template>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-overlay absolute>
                  <v-btn
                    text
                    color="white"
                    :to="{
                      name: 'restaurant-id-img-id',
                      params: { id: res.name },
                    }"
                  >
                    <h1>+ {{ img.length }}</h1>
                  </v-btn>
                </v-overlay>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          {{ res.description }}
        </v-col>
      </v-row>
    </v-card>

    <v-card-title> Comment </v-card-title>
    <div v-if="login == true">
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <v-btn to="/SignIn">Login</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="login == false">
      <v-row>
        <v-col>
          <v-avatar><v-img :src="userdata.img"></v-img></v-avatar>
          {{ userdata.user }}
        </v-col>
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
              <v-img :src="item"></v-img>
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
      overlay: true,
      items: [
        {
          text: "หน้าแรก",
          disabled: false,
          to: "/",
        },
        {
          text: this.$route.params.id,
          disabled: true,
          to: "",
        },
      ],
      link: "",
      res: [],
      not: false,
      title: "",
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
      address: [],
      img: [],
    };
  },
  async created() {
    await this.getres();
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
    genlink() {
      this.link = this.res.name.replace(/ /g, "%20");
    },
    getres() {
      db.collection("restaurant")
        .where("name", "==", this.$route.params.id)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.res = data[0];
          this.address = data[0].address;
          this.img = data[0].img;
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
      for (this.i; this.i < this.n; this.i++) {
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
            alert("สำเร็จ");
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
    addfev() {
      if (this.login === false) {
        var email = this.$nuxt.$store.state.user.email;
        var data = this.res.name;
        db.collection("User")
          .doc(email)
          .update({ favorite: firebase.firestore.FieldValue.arrayUnion(data) })
          .then(function () {
            alert("เพิ่มร้านโปรด");
          });
      } else {
        this.$router.push("/SignIn");
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
