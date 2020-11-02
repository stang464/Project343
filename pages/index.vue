<template>
  <div id="app" class="container">
    <v-row>
      <v-col cols="2" class="d-none d-md-block">
        <div>
          <v-checkbox
            label="ร้านอาหาร"
            value="ร้านอาหาร"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="ร้านกาแฟ"
            value="ร้านกาแฟ"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="บุฟเฟต์"
            value="บุฟเฟต์"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="ชาบู"
            value="ชาบู"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="หมูกะทะ"
            value="หมูกะทะ"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="เกาหลี"
            value="เกาหลี"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
          <v-checkbox
            label="ญี่ปุ่น"
            value="ญี่ปุ่น"
            v-model="type"
            @change="selectType"
          ></v-checkbox>
        </div>
        <div><hr /></div>
        <div>
          <div><h3>คะแนน</h3></div>
          <div>
            <v-checkbox
              label="2.0 +"
              value="2"
              v-model="secrate"
              @change="selectType"
            ></v-checkbox>
            <v-checkbox
              label="3.0 +"
              value="3"
              v-model="secrate"
              @change="selectType"
            ></v-checkbox>
            <v-checkbox
              label="4.0 +"
              value="4"
              v-model="secrate"
              @change="selectType"
            ></v-checkbox>
          </div>
          <div>
            <hr />
          </div>
        </div>
      </v-col>
      <v-col sm="12" md="10" lg="10">
        <div>
          <v-card>
            <v-carousel
              cycle
              height="200"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="item in topres"
                :key="item.name"
                :src="item.img[0]"
                :to="{ name: 'restaurant-id-res', params: { id: item.name } }"
              >
                <div>
                  <H3>{{ item.name }}</H3>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </div>

        <div class="mt-5 justify-center">
          <v-col cols="10" class="mx-auto d-flex">
            <v-text-field
              label="ค้นหา"
              placeholder="ร้าน , สถานที่"
              v-model="text"
              solo
            ></v-text-field>
            <v-btn @click="search" class="mx-2" fab dark color="error">
              <v-icon dark> mdi-magnify </v-icon>
            </v-btn>
          </v-col>
        </div>

        <div v-for="(item, index) in res" :key="index" class="mt-2">
          <v-card>
            <v-row class="pa-3">
              <v-col cols="12" class="d-inline-flex mb-0 py-0">
                <div class="mr-1">
                  <n-link
                    :to="{
                      name: 'restaurant-id-res',
                      params: { id: item.name },
                    }"
                  >
                    <h4 style="color: black">
                      {{ item.name }}
                    </h4>
                  </n-link>
                </div>
                <div>
                  <span>{{ item.address.sub_district }}</span>
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
                        @click="genlink(index)"
                      >
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item>
                        <ShareNetwork
                          network="facebook"
                          :url="`https://project-cs343-cs313.web.app/restaurant/${link}`"
                          :title="item.name"
                        >
                          Facebook
                        </ShareNetwork>
                      </v-list-item>
                      <v-list-item>
                        <ShareNetwork
                          network="twitter"
                          :url="`https://project-cs343-cs313.web.app/restaurant/${link}`"
                          :title="item.name"
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
              <v-col cols="12" class="py-0">
                <div class="d-inline-flex" style="height: 20px">
                  <v-sheet
                    color="warning"
                    height="20"
                    width="47"
                    class="d-inline-flex"
                    rounded="rounded"
                  >
                    <div>
                      <p style="color: white; font-size: 14px">
                        {{ item.rating }}
                      </p>
                    </div>
                    <div>
                      <v-icon small color="white" class="mb-1"
                        >mdi-star-circle
                      </v-icon>
                    </div>
                  </v-sheet>

                  <div class="ml-1">{{ item.review }} รีวิว</div>
                  <div class="ml-3">{{ item.open }} - {{ item.close }}</div>
                </div>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" class="py-0 d-inline-flex">
                <div v-for="item in item.genre" :key="item">
                  {{ item }} &nbsp;
                </div>
              </v-col>
              <v-col cols="3" v-for="i in 4" :key="i" class="d-flex">
                <v-img
                  :src="item.img[i - 1]"
                  aspect-ratio="1"
                  class="rounded"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { db } from "~/plugins/firebase.js";
import firebase from "~/plugins/firebase.js";

export default {
  components: {},
  data() {
    return {
      not: false,
      res: [],
      index: 0,
      faver: [],
      link: "",
      text: "",
      topres: [],
      review: 0,
      type: null,
      secrate: null,
    };
  },
  computed: {
    login: {
      get() {
        return this.$nuxt.$store.state.login;
      },
    },
    userdata: {
      get() {
        return this.$nuxt.$store.state.user;
      },
    },
  },
  created() {
    this.getres();
    this.resDesc();
  },

  methods: {
    genlink(index) {
      this.link = this.res[index].name.replace(/ /g, "%20");
    },
    getres() {
      db.collection("restaurant").onSnapshot((querySnapshot) => {
        /* eslint no-var: */
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        this.res = data;
      });
    },
    search() {
      var arr = [];
      db.collection("restaurant")
        .where("address.province", "==", this.text)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
        });
      db.collection("restaurant")
        .where("address.district", "==", this.text)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
        });
      db.collection("restaurant")
        .where("address.sub_district", "==", this.text)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
        });
      db.collection("restaurant")
        .where("name", "==", this.text)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
        });
      db.collection("restaurant")
        .where("genre", "array-contains", this.text)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
        });
      this.res = arr;
    },
    addfev(index) {
      if (this.login === false) {
        var email = this.userdata[0].email;
        var data = this.res[index].name;
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
    resDesc() {
      db.collection("restaurant")
        .orderBy("rating", "desc")
        .limit(5)
        .onSnapshot((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.topres = data;
          console.log(this.topres);
        });
    },
    selectType() {
      if (this.type !== null && this.secrate != null) {
        var arr = this.res.filter((el) => {
          return (
            el.genre.some((el) => {
              return el === this.type;
            }) && el.rating >= this.secrate
          );
        });
        this.res = arr;
      } else if (this.type !== null && this.secrate == null) {
        arr = this.res.filter((el) => {
          return el.genre.some((el) => {
            return el === this.type;
          });
        });
        this.res = arr;
      } else if (this.type === null && this.secrate != null) {
        arr = this.res.filter((el) => {
          return el.rating >= this.secrate;
        });
        this.res = arr;
      } else if (this.type === null && this.secrate == null) {
        this.getres();
      }
    },
  },
};
</script>
<style>
#app {
  font-family: "Prompt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f1f1f1;
}
a {
  color: black;
  text-decoration: none;
}
</style>
