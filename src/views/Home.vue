<template>
  <v-container>
    <h1>Databases</h1>
    <v-list two-line v-if="databases.length > 0">
      <v-list-item v-for="db in databases" :key="db.name" :to="{ name: 'database.view', params: { name: db.name } }">
        <v-list-item-icon>
          <v-icon>{{ icons.mdiDatabase }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ db.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ db.path }}</v-list-item-subtitle>
        </v-list-item-content>
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

import { mdiDatabase, mdiDatabasePlus, mdiDatabaseImport, mdiDotsVertical, mdiTrashCan } from "@mdi/js";

@Component
export default class Home extends Vue {
  @Getter("databases", { namespace: "userSettings" })
  databases!: DatabaseReference[];

  icons = {
    mdiDatabase,
    mdiDatabasePlus,
    mdiDatabaseImport,
    mdiDotsVertical,
    mdiTrashCan
  };
}
</script>
