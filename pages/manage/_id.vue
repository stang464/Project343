<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="link" large></v-breadcrumbs>
    </v-row>
    <v-col>
      <v-card>
        <v-col cols="12">
          <v-text-field v-model="res.name" label="ชื่อร้าน" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="8">
          <v-select
            v-model="res.genre"
            :rules="nameRules"
            :items="items"
            label="ประเภทร้าน"
            attach
            chips
            multiple
          ></v-select>
        </v-col>
        <v-col cols="12" class="d-inline-flex">
          <v-text-field v-model="res.open" label="เวลาเปิด" clearable>
          </v-text-field>
          <v-text-field
            v-model="res.close"
            label="เวลาปิด"
            class="ml-1"
            clearable
          >
          </v-text-field>
        </v-col>
        <v-col cols="5"> </v-col>
        <v-col cols="6">
          <v-text-field v-model="res.phone" label="โทร" clearable>
          </v-text-field>
        </v-col>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-row class="pa-2">
          <v-col cols="6">
            <v-textarea v-model="address.add" label="ที่อยู่ร้าน" clearable>
            </v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="address.sub_district"
              label="ตำบล/แขวง"
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="address.district"
              label="อำเภอ/เขต"
              clearable
            >
            </v-text-field>
            <v-text-field v-model="address.province" label="จังหวัด" clearable>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col>
            <v-textarea v-model="res.description" label="คำอธิบาร้าน" clearable>
            </v-textarea>
          </v-col>
        </v-row>
        <v-col
          cols="3"
          v-for="(i, index) in res.img"
          :key="index"
          class="d-inline-flex"
        >
          <v-img :src="i" aspect-ratio="1" class="rounded">
            <template>
              <v-row class="pa-2">
                <v-btn color="red" icon @click="delImg(index)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="3" v-for="k in urlimg" :key="k" class="d-inline-flex">
          <v-img :src="k" aspect-ratio="1" class="rounded"> </v-img>
        </v-col>
        <v-col>
          <v-file-input
            multiple
            prepend-icon="mdi-camera"
            label="เพิ่มรูป"
            @change="previewImg"
          ></v-file-input>
          <v-col class="mt-n4"><v-btn @click="upload">upload</v-btn></v-col>
        </v-col>
        <v-col class="text-right">
          <v-btn text @click="save">Save</v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import firebase, { firestore } from "firebase/app";
import { db } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      urlimg: [],
      nameres: this.$route.params.id,
      i: 0,
      n: 0,
      imageData: null,
      res: [],
      address: [],
      link: [
        {
          text: "หน้าแรก",
          disabled: false,
          to: "/",
        },
        {
          text: "จัดการร้าน",
          disabled: false,
          to: "/manageRestaurant",
        },
        {
          text: this.$route.params.id,
          disabled: true,
          to: "",
        },
      ],
      items: [
        "ร้านอาหาร",
        "ร้านขนม",
        "ร้านกาแฟ",
        "บุฟเฟต์",
        "ชาบู",
        "หมูกะทะ",
        "ญี่ปุ่น",
        "เกาหลี",
        "ยุโรป",
        "นานาชาติ",
      ],
    };
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
  async created() {
    await this.getres();
  },
  methods: {
    previewImg(event) {
      this.urlimg = [];
      this.imageData = event;
    },
    upload() {
      this.i = 0;
      this.n = this.imageData.length;
      for (this.i; this.i < this.n; this.i++) {
        const storageRef = firebase
          .storage()
          .ref(`restaurant/${this.res.name}/${this.imageData[this.i].name}`);
        var uploadTask = storageRef.put(this.imageData[this.i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          }
        );
        firebase
          .storage()
          .ref(`restaurant/${this.res.name}/${this.imageData[this.i].name}`)
          .getDownloadURL()
          .then((url) => {
            this.urlimg.push(url);
            this.urlimg = this.urlimg.filter(function (elem, index, self) {
              return index === self.indexOf(elem);
            });
            alert("สำเร็จ");
          });
      }
    },
    getres() {
      db.collection("restaurant")
        .where("name", "==", this.nameres)
        .onSnapshot((querySnapshot) => {
          /* eslint no-var: */
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          this.res = data[0];
          this.address = data[0].address;
        });
    },
    delImg(index) {
      console.log(this.res.img[index]);
      db.collection("restaurant")
        .doc(this.res.name)
        .update({ img: firestore.FieldValue.arrayRemove(this.res.img[index]) });
      const storageRef = firebase.storage().refFromURL(this.res.img[index]);
      storageRef.delete();
    },
    save() {
      console.log(this.urlimg);
      var data = this.res;
      db.collection("restaurant")
        .doc(this.res.name)
        .update(data)
        .then(function () {
          alert("สำเร็จ");
        });
      for (var i = 0; i < this.urlimg.length; i++) {
        db.collection("restaurant")
          .doc(this.res.name)
          .update({ img: firestore.FieldValue.arrayUnion(this.urlimg[i]) });
      }
      this.$router.push("/manageRestaurant");
    },
  },
};
</script>

<style></style>
