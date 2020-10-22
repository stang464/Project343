<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>ร้านอาหาร</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.open"
                      label="open"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.close"
                      label="close"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address.add"
                      label="address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address.sub_district"
                      label="sub district"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address.district"
                      label="district"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address.province"
                      label="province"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save">OK</v-btn>
                    </v-card-actions></v-col
                  >
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { db } from "~/plugins/firebase.js";
export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    newname: "",
    old: "",
    headers: [
      {
        text: "ร้าน",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "open", value: "open" },
      { text: "close", value: "close" },
      { text: "phone", value: "phone" },
      { text: "address", value: "address.add" },
      { text: "sub district", value: "address.sub_district" },
      { text: "district", value: "address.district" },
      { text: "Province", value: "address.province" },
      { text: "description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      open: 0,
      close: 0,
      address: "",
      sub_district: "",
      district: "",
      province: "",
      description: "",
    },
    defaultItem: {
      name: "",
      open: 0,
      close: 0,
      address: "",
      sub_district: "",
      district: "",
      province: "",
      description: "",
    },
    arr: {},
  }),

  computed: {
    edit: {
      get() {
        return this.editedItem;
      },
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      db.collection("restaurant").onSnapshot((querySnapshot) => {
        /* eslint no-var: */
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        this.desserts = data;
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var old = this.desserts[this.editedIndex].name;
      this.desserts.splice(this.editedIndex, 1);
      db.collection("restaurant").doc(old).delete();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    toObject(arr) {
      var rv = {};
      for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
      return rv;
    },

    save() {
      if (this.editedIndex > -1) {
        this.old = this.desserts[this.editedIndex].name;
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.newname = this.desserts[this.editedIndex].name;
        this.arr = this.desserts[this.editedIndex];
      } else {
        this.desserts.push(this.editedItem);
      }
      db.collection("restaurant")
        .doc(this.old)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            var old = this.old;
            var obj = this.arr;
            db.collection("restaurant")
              .doc(this.newname)
              .set(obj)
              .then(function () {
                db.collection("restaurant").doc(old).delete();
              });
          }
        });
      this.close();
    },
  },
};
</script>
