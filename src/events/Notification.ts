import { EventType } from "@/services/EventBus";
import { Notification } from "@/model/Notification";

export const NotificationEvent: EventType<Notification> = {
  name: "notification"
};
