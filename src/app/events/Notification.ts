import { EventType } from "~/services/EventBus";

import { Notification } from "~common/model/Notification";

export const NotificationEvent: EventType<Notification> = {
  name: "notification"
};
