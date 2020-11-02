<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row class="pa-5">
            <v-col cols="3" md="3" sm="3">
              <p v-if="userdata[0].img == null">{{ userdata[0].user }}</p>

              <img
                :src="userdata[0].img"
                style="border-radius: 5%; width: 100%; hight: auto"
              />
              <v-file-input
                hide-input
                prepend-icon="mdi-square-edit-outline"
                @change="previewImage"
              ></v-file-input>
            </v-col>
            <v-col cols="8" md="8" sm="8">
              <h3>
                {{ userdata[0].user }}
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"
                      ><v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">User</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-text-field
                            v-model="newuser"
                            :label="userdata[0].user"
                            solo
                          ></v-text-field>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="(dialog = false), edituser()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </h3>
              <p>{{ userdata[0].email }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <h2>ร้านโปรด</h2>
        <v-card>
          <v-col cols="12">
            <v-list>
              <v-list
                v-for="(item, index) in userdata[0].favorite"
                :key="index"
              >
                <nuxt-link
                  :to="{ name: 'restaurant-res', params: { id: item } }"
                >
                  {{ item }}
                </nuxt-link>
                <v-btn icon color="pink" @click="unfav(index)">
                  <v-icon> mdi-bookmark-off</v-icon>
                </v-btn>
              </v-list>
            </v-list>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import firebase from "~/plugins/firebase.js";

export default {
  components: {},
  data() {
    return {
      imageData: null,
      picture: null,
      items: [
        {
          text: "หน้าแรก",
          disabled: false,
          to: "/",
        },
        {
          text: "Profile",
          disabled: true,
          to: "/",
        },
      ],
      list: [],
      dialog: false,
      newuser: "",
    };
  },
  computed: {
    userdata: {
      get() {
        return this.$nuxt.$store.state.user;
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
        .where("email", "==", this.userdata[0].email)
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
    unfav(index) {
      db.collection("User")
        .doc(this.userdata[0].email)
        .update({
          favorite: firebase.firestore.FieldValue.arrayRemove(
            this.userdata[0].favorite[index]
          ),
        });
    },
    edituser() {
      var data = { user: this.newuser };
      db.collection("User").doc(this.userdata[0].email).update(data);
    },
    previewImage(event) {
      this.picture = null;
      this.imageData = event;
      this.onUpload();
    },
    async onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`Profile/${this.imageData.name}`);
      var uploadTask = storageRef.put(this.imageData);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((dowloadURL) => {
            this.picture = dowloadURL;
            db.collection("User")
              .doc(this.userdata[0].email)
              .update({ img: this.picture });
            alert("Upload สำเร็จ");
          });
        }
      );
    },
  },
};
</script>

<style></style>
