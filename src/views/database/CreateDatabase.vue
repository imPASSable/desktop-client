<template>
  <v-container>
    <h1>Create new database</h1>

    <v-form ref="form">
      <v-text-field v-model="databaseName" outlined label="Name" :rules="validators.name" />

      <v-text-field v-model="password" type="password" outlined label="Password" :rules="validators.password" />

      <v-text-field v-model="repeat" type="password" outlined label="Repeat password" :rules="validators.repeat" />

      <v-btn large color="success" class="mr-4" @click="submit">Save</v-btn>

      <v-btn large color="error" class="mr-4" :to="{ name: 'home' }">Cancel</v-btn>

      <v-snackbar color="error" v-model="createDbFailed">
        Couldn't create the database
        <v-btn text @click="createDbFailed = false">Close</v-btn>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { databaseService } from "@/services/DatabaseService";
import { required } from "@/validators";
import { minLength, complexityFull } from "@/validators/password";
import { DatabaseReference } from "@/model/DatabaseReference";

@Component
export default class CreateDatabase extends Vue {
  databaseName: string = "";
  password: string = "";
  repeat: string = "";
  createDbFailed: boolean = false;

  @Getter("lastPath", { namespace: "userSettings" }) lastPath?: string;
  @Action("addDatabase", { namespace: "userSettings" }) addDatabase!: (database: DatabaseReference) => Promise<void>;

  validators = {
    name: [required],
    password: [minLength(8), complexityFull],
    repeat: [this.validateRepeatPassword]
  };

  validateRepeatPassword(value: string): boolean | string {
    return value === this.password || "Passwords don't match";
  }

  submit() {
    this.createDbFailed = false;
    // @ts-ignore
    if (this.$refs.form.validate()) {
      databaseService
        .create(this.databaseName, this.lastPath)
        .then((path: string) => {
          return this.addDatabase({ name: this.databaseName, path });
        })
        .then(() => {
          this.$router.push({ name: "database.view", params: { name: this.databaseName } });
        })
        .catch(() => {
          this.createDbFailed = true;
        });
    }
  }
}
</script>
