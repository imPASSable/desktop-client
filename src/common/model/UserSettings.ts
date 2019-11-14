import { DatabaseReference } from "~common/model/DatabaseReference";

export interface UserSettings {
  darkMode: boolean;
  lastPath?: string;
  databases: DatabaseReference[];
}
