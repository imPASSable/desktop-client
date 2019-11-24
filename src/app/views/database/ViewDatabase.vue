<template>
  <v-container>
    <h1>Database {{ databaseName }}</h1>
    <v-treeview :items="items" :open.sync="open">
      <template v-slot:prepend="{ item }">
        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        <v-icon v-else-if="item.id in open">{{ icons.mdiFolderOpen }}</v-icon>
        <v-icon v-else>{{ icons.mdiFolder }}</v-icon>
      </template>
    </v-treeview>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { mdiFolder, mdiFolderOpen } from "@mdi/js";

import { Database, GroupSecret, Secret, SecretIdentifier } from "~common/model/Database";
import { DatabaseReference } from "~common/model/DatabaseReference";

interface TreeNode {
  id: SecretIdentifier;
  name: string;
  children?: TreeNode[];
}

function isGroupSecret(secret: Secret | undefined): secret is GroupSecret {
  return typeof secret !== "undefined" && "members" in secret;
}

function findSecretById(db: Database, id: SecretIdentifier): Secret | undefined {
  return db.secrets.find(secret => secret.id === id);
}

function buildTreeChildren(db: Database, node: GroupSecret): TreeNode[] {
  const members: GroupSecret[] = node.members.map(id => findSecretById(db, id)).filter(isGroupSecret);
  members.sort((a, b) => a.name.localeCompare(b.name));
  return members.map(group => {
    const children: TreeNode[] = buildTreeChildren(db, group);
    return { id: group.id, name: group.name, children } as TreeNode;
  });
}

@Component
export default class ViewDatabase extends Vue {
  get databaseName(): string {
    return this.$route.params.name;
  }

  @Getter("databases", { namespace: "userSettings" })
  databases!: DatabaseReference[];

  @Getter("getDatabase", { namespace: "database" })
  getDatabase!: (name: string) => Database;

  get database(): Database | undefined {
    return this.getDatabase(this.$route.params.name);
  }

  get root(): GroupSecret | undefined {
    return typeof this.database === "undefined"
      ? undefined
      : (findSecretById(this.database, this.database.root) as GroupSecret);
  }

  icons = { mdiFolder, mdiFolderOpen };
  open: SecretIdentifier[] = [];

  get items(): TreeNode[] {
    if (typeof this.database === "undefined" || typeof this.root === "undefined") {
      return [];
    }

    return buildTreeChildren(this.database, this.root);
  }
}
</script>
