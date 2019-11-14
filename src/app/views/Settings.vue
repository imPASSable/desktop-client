<template>
  <v-container>
    <v-switch :input-value="darkMode" label="Dark mode" @change="setDarkMode($event)"></v-switch>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Settings extends Vue {
  @Getter("darkMode", { namespace: "userSettings" }) darkMode!: boolean;
  @Action("setDarkMode", { namespace: "userSettings" }) setDarkMode!: (darkMode: boolean) => void;
}
</script>
