<template>
  <v-container>
    <v-col>
      <div v-for="(item, index) in res" :key="index" class="mt-2">
        <v-card>
          <v-row class="pa-3">
            <v-col cols="12" class="d-inline-flex mb-0 py-0">
              <div class="mr-1">
                <n-link
                  :to="{
                    name: 'manage-id',
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
  </v-container>
</template>
<script>
import { db } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      res: [],
    };
  },
  computed: {
    user: {
      get() {
        return this.$nuxt.$store.state.user[0];
      },
    },
  },
  created() {
    this.getres();
  },
  methods: {
    getres() {
      db.collection("restaurant")
        .where("owner", "==", this.user.email)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.res = data;
        });
    },
  },
};
</script>

<style></style>
