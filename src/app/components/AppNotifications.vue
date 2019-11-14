<template>
  <v-container>
    <v-snackbar
      v-for="(notification, key, index) in notifications"
      :key="key"
      :color="notification.type"
      value="true"
      @input="removeNotification(false, key)"
      bottom
      :style="{ 'margin-bottom': index * 4 + 'em' }"
    >
      <span v-html="notification.message"></span>
      <v-btn text @click="removeNotification(false, key)">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";

import { NotificationEvent } from "~/events/Notification";
import { EventBus } from "~/services/EventBus";

import { Notification } from "~common/model/Notification";

interface Notifications {
  [key: string]: Notification;
}

@Component
export default class AppNotifications extends Vue {
  notifications: Notifications = {};

  @Inject() eventBus!: EventBus;

  private count: number = 0;

  mounted() {
    this.eventBus.addListener(NotificationEvent, this.addNotification);
  }

  destroyed() {
    this.eventBus.removeListener(NotificationEvent, this.addNotification);
  }

  addNotification(notification: Notification) {
    Vue.set(this.notifications, this.count++, notification);
  }

  removeNotification(show: boolean, key: string) {
    if (show) {
      return;
    }
    Vue.delete(this.notifications, key);
  }
}
</script>
