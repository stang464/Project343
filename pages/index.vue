<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="8" md="6"> <search></search> </v-col>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(list, index) in $res" :key="index" cols="12">
            <v-card>
              <v-img
                :src="list.img[0]"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <nuxt-link
                  :to="{ name: 'post-id', params: { id: list.name } }"
                  active-class="my-custom-exact-active-link"
                  ><v-card-title v-text="list.name"></v-card-title
                ></nuxt-link>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="getfev(), fav(index)">
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <div v-show="not">{{ user }}</div>
  </v-container>
</template>
<script>
import search from "@/components/search";
import { db } from "~/plugins/firebase.js";
export default {
  components: {
    search,
  },
  data() {
    return {
      not: false,
      res: [],
      index: 0,
      faver: [],
    };
  },
  computed: {
    $res: {
      get() {
        this.getres();
        return this.res;
      },
    },
    email: {
      get() {
        return this.$nuxt.$store.state.email;
      },
    },
    login: {
      get() {
        return this.$nuxt.$store.state.login;
      },
    },
    user() {
      this.getfev();
      return this.faver;
    },
  },
  methods: {
    getres() {
      db.collection("restaurant").onSnapshot((querySnapshot) => {
        /* eslint no-var: */
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        this.res = data;
        // console.log(this.res);
      });
    },
    getfev() {
      db.collection("User")
        .where("email", "==", this.email)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          var tmp = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
            for (var i in data[0].favorite) {
              tmp[i] = data[0].favorite[i];
            }
            this.faver = tmp;
          });
        });
    },

    fav(index) {
      if (this.login === false) {
        var tmp = this.user;
        var data = this.$res[index].name;
        tmp.push(data);
        console.log("tmp :", tmp);
        db.collection("User")
          .doc(this.email)
          .update("favorite", tmp)
          .then(function () {
            alert("เพิ่มร้านโปรด");
          });
      } else {
        this.$router.push("/SignIn");
      }
    },
  },
};
</script>
<style>
.my-custom-exact-active-link {
  color: red;
}
.nuxt-link-exact-active {
  color: green;
}
</style>
