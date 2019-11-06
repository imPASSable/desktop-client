<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped mobile-break-point="0">
      <v-list dense>
        <v-list-item v-for="item in nav" :key="item.text" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">
          <span class="font-weight-light">in</span>
          PASS
          <span class="font-weight-light">able</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fill-height>
        <HelloWorld />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {
    HelloWorld
  },

  data: () => {
    return {
      drawer: false,
      nav: [
        {
          icon: "mdi-settings",
          text: "Settings"
        }
      ]
    };
  }
});
</script>
