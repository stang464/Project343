<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="email" name="input-10-1" label="Email">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="user" name="input-10-1" label="User  Name">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-avatar color="primary" size="128"><img :src="picture" /></v-avatar>
      </v-col>
      <v-col cols="3">
        <v-file-input
          accept="image/*"
          label="เพิ่มรูปภาพ"
          @change="previewImage"
        ></v-file-input>
        <v-btn @click="onUpload">UPLOAD</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <hr />
      <v-checkbox label="ผู้เยียมชม" value="1" v-model="auth"></v-checkbox>
      <v-checkbox label="เจ้าของร้าน" value="2" v-model="auth"></v-checkbox>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="singup">Register</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import { db } from "~/plugins/firebase.js";
import "firebase/auth";
export default {
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      error: "",
      user: "",
      auth: 0,
      uploadValue: 0,
      picture: null,
      imageData: null,
    };
  },
  methods: {
    singup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error;
          alert(error);
        });
      /* eslint no-var: */
      var data = {
        email: this.email,
        user: this.user,
        favorite: [],
        auth: this.auth,
        img: this.picture,
      };
      db.collection("User")
        .doc(this.email)
        .set(data)
        .then(function () {
          alert("ลงทะเบียนสำเร็จ");
        });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event;
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`Profile/${this.imageData.name}`);
      var uploadTask = storageRef.put(this.imageData);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((dowloadURL) => {
            this.picture = dowloadURL;
            alert("Upload สำเร็จ");
          });
        }
      );
    },
  },
};
</script>
