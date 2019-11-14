import { mdiHome, mdiSettings, mdiInformationOutline, mdiDatabasePlus } from "@mdi/js";
import { NavigationLink } from "@/model/NavigationLink";

export interface MenuProvider {
  (): NavigationLink[];
}

export const mainMenuProvider: MenuProvider = () => [
  { icon: mdiHome, text: "Dashboard", route: "home", divider: true },
  { icon: mdiDatabasePlus, text: "Create Database", route: "database.create" },
  { icon: mdiSettings, text: "Settings", route: "settings", divider: true },
  { icon: mdiInformationOutline, text: "About", route: "about" }
];
