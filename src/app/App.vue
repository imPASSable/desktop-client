<template>
  <v-app>
    <v-navigation-drawer permanent app clipped mobile-break-point="0">
      <AppMenu :links="mainMenu"></AppMenu>
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

import { NavigationLink } from "~common/model/NavigationLink";

import AppMenu from "~/components/AppMenu.vue";
import AppNotifications from "~/components/AppNotifications.vue";
import { DefaultEventBus, EventBus } from "~/services/EventBus";
import { mainMenuProvider } from "~/services/MenuProvider";

@Component({
  components: { AppMenu, AppNotifications }
})
export default class App extends Vue {
  @Getter("darkMode", { namespace: "userSettings" }) darkMode!: boolean;
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
