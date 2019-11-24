<template>
  <v-container>
    <v-list v-if="databases.length > 0" two-line subheader>
      <v-subheader inset>Databases</v-subheader>

      <v-list-item v-for="db in databases" :key="db.name" @click="onOpenDatabase(db)">
        <v-list-item-avatar>
          <v-icon>{{ icons.mdiDatabase }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ db.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ db.path }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon :to="{ name: 'database.settings', params: { name: db.name } }">
            <v-icon>{{ icons.mdiSettings }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-alert border="left" colored-border type="info" elevation="2" v-else>
      You have no managed databases.
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-btn large color="success" class="mr-4" :to="{ name: 'database.create' }">
        <v-icon class="mr-2">{{ icons.mdiDatabasePlus }}</v-icon>
        Create
      </v-btn>
      or
      <v-btn large color="primary" class="ml-4">
        <v-icon class="mr-2">{{ icons.mdiDatabaseImport }}</v-icon>
        Open
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { mdiDatabase, mdiDatabasePlus, mdiDatabaseImport, mdiTrashCan, mdiSettings } from "@mdi/js";

import { DatabaseReference } from "~common/model/DatabaseReference";

import { NotificationEvent } from "~/events/Notification";
import { EventBus } from "~/services/EventBus";

@Component
export default class Home extends Vue {
  @Inject() eventBus!: EventBus;

  @Getter("databases", { namespace: "userSettings" })
  databases!: DatabaseReference[];

  @Action("openDatabase", { namespace: "database" })
  openDatabase!: (ref: DatabaseReference) => Promise<void>;

  icons = {
    mdiDatabase,
    mdiDatabasePlus,
    mdiDatabaseImport,
    mdiTrashCan,
    mdiSettings
  };

  onOpenDatabase(ref: DatabaseReference) {
    this.openDatabase(ref)
      .then(() => {
        this.$router.push({ name: "database.view", params: { name: ref.name } });
      })
      .catch(() => {
        this.eventBus.dispatch(NotificationEvent, {
          type: "error",
          message: `Couldn't open database <strong>${name}</strong>`
        });
      });
  }
}
</script>
