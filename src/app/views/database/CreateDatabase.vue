<template>
  <v-container>
    <h1>Create new database</h1>

    <v-form ref="form" @submit="submit">
      <v-text-field v-model="databaseName" outlined label="Name" :rules="validators.name" />
      <v-text-field v-model="password" type="password" outlined label="Password" :rules="validators.password" />
      <v-text-field v-model="repeat" type="password" outlined label="Repeat password" :rules="validators.repeat" />

      <v-btn type="submit" large color="success" class="mr-4">Save</v-btn>
      <v-btn large color="error" class="mr-4" :to="{ name: 'home' }">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { DatabaseReference } from "~common/model/DatabaseReference";

import { NotificationEvent } from "~/events/Notification";
import { databaseService } from "~/services/DatabaseService";
import { EventBus } from "~/services/EventBus";
import { required } from "~/validators";
import { minLength, complexityFull } from "~/validators/password";

@Component
export default class CreateDatabase extends Vue {
  databaseName: string = "";
  password: string = "";
  repeat: string = "";

  @Getter("lastPath", { namespace: "userSettings" }) lastPath?: string;
  @Action("addDatabase", { namespace: "userSettings" }) addDatabase!: (database: DatabaseReference) => Promise<void>;

  @Inject() eventBus!: EventBus;

  validators = {
    name: [required],
    password: [minLength(8), complexityFull],
    repeat: [this.validateRepeatPassword]
  };

  validateRepeatPassword(value: string): boolean | string {
    return value === this.password || "Passwords don't match";
  }

  submit() {
    // @ts-ignore
    if (this.$refs.form.validate()) {
      databaseService
        .create(this.databaseName, this.lastPath)
        .then(path => {
          const ref: DatabaseReference = { name: this.databaseName, path };
          return databaseService.save(ref, databaseService.createEmpty()).then(() => ref);
        })
        .then(this.addDatabase)
        .then(() => {
          this.$router.push({ name: "database.view", params: { name: this.databaseName } });
        })
        .catch(() => {
          this.eventBus.dispatch(NotificationEvent, {
            type: "error",
            message: `Couldn't create database <strong>${this.databaseName}</strong>`
          });
        });
    }
  }
}
</script>
