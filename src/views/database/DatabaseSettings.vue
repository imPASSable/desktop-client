<template>
  <v-container>
    <h1>Danger zone</h1>
    <v-card outlined class="error-border">
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Remove database</v-list-item-title>
            <v-list-item-subtitle>
              Removing database will not delete the database file from your disk.
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn color="error" @click="showRemoveDialog = true">Remove database</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <v-dialog v-model="showRemoveDialog">
      <v-card>
        <v-card-title class="headline error lighten-2 mb-4">Are you sure?</v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="removeDb">Remove database</v-btn>
          <v-btn color="primary" text @click="showRemoveDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { WithRoute } from "@/util/WithRoute";
import { EventBus } from "@/services/EventBus";
import { NotificationEvent } from "@/events/Notification";

@Component
export default class DatabaseSettings extends Vue implements WithRoute {
  get databaseName(): string {
    return this.$route.params.name;
  }

  showRemoveDialog: boolean = false;

  @Inject() eventBus!: EventBus;

  @Action("removeDatabase", { namespace: "userSettings" }) removeDatabase!: (name: string) => Promise<void>;

  removeDb() {
    this.showRemoveDialog = false;
    this.removeDatabase(this.databaseName + "asasas")
      .then(() => {
        this.eventBus.dispatch(NotificationEvent, {
          type: "success",
          message: `Removed database <strong>${this.databaseName}</strong>`
        });
        this.$router.push({ name: "home" });
      })
      .catch(() => {
        this.eventBus.dispatch(NotificationEvent, {
          type: "error",
          message: `Couldn't remove database <strong>${this.databaseName}</strong>`
        });
      });
  }
}
</script>

<style scoped>
.v-card.v-card--outlined.error-border {
  border-color: var(--v-error-base);
}
</style>
