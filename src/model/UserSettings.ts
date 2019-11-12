import { DatabaseReference } from "@/model/DatabaseReference";

export interface UserSettings {
  darkMode: boolean;
  lastPath?: string;
  databases: DatabaseReference[];
}
