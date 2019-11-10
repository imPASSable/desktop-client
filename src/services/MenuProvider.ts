import { NavigationLink } from "@/model/NavigationLink";

export interface MenuProvider {
  (): NavigationLink[];
}

export const mainMenuProvider: MenuProvider = () => [
  { icon: "mdi-home", text: "Dashboard", route: "home" },
  { icon: "mdi-information-outline", text: "About", route: "about" },
  { icon: "mdi-settings", text: "Settings", route: "settings" }
];
