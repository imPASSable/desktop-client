<template>
  <v-container>
    <v-list v-if="databases.length > 0" two-line subheader>
      <v-subheader inset>Databases</v-subheader>

      <v-list-item v-for="db in databases" :key="db.name" :to="{ name: 'database.view', params: { name: db.name } }">
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
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { DatabaseReference } from "@/model/DatabaseReference";

import { mdiDatabase, mdiDatabasePlus, mdiDatabaseImport, mdiTrashCan, mdiSettings } from "@mdi/js";

@Component
export default class Home extends Vue {
  @Getter("databases", { namespace: "userSettings" })
  databases!: DatabaseReference[];

  icons = {
    mdiDatabase,
    mdiDatabasePlus,
    mdiDatabaseImport,
    mdiTrashCan,
    mdiSettings
  };
}
</script>
