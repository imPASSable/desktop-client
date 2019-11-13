<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped mobile-break-point="0">
      <AppMenu :links="mainMenu" @route="drawer = false"></AppMenu>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">
          <span class="font-weight-light">im</span>PASS<span class="font-weight-light">able</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <AppNotifications />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch, Provide } from "vue-property-decorator";
import { Getter } from "vuex-class";
import AppMenu from "@/components/AppMenu.vue";
import { NavigationLink } from "@/model/NavigationLink";
import { mainMenuProvider } from "@/services/MenuProvider";
import { DefaultEventBus, EventBus } from "@/services/EventBus";
import AppNotifications from "@/components/AppNotifications.vue";

@Component({
  components: { AppMenu, AppNotifications }
})
export default class App extends Vue {
  @Getter("darkMode", { namespace: "userSettings" }) darkMode!: boolean;
  drawer: boolean = false;
  mainMenu: NavigationLink[] = mainMenuProvider();

  @Provide() eventBus: EventBus = new DefaultEventBus();

  mounted() {
    this.onDarkModeChanged();
  }

  @Watch("darkMode")
  onDarkModeChanged() {
    this.$vuetify.theme.dark = this.darkMode;
  }
}
</script>
