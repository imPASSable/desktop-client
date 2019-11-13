export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  type: NotificationType;
  icon?: string;
  message: string;
}
