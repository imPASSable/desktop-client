<template>
  <v-list dense>
    <v-list-item v-for="nav in links" :key="nav.text" :to="{ name: nav.route }" @click.stop="$emit('route')">
      <v-list-item-icon>
        <v-icon>{{ nav.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ nav.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/model/NavigationLink";

@Component
export default class AppMenu extends Vue {
  @Prop(Array) links!: NavigationLink[];
}
</script>
