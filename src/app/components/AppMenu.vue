<template>
  <v-list dense>
    <template v-for="(nav, index) in links">
      <v-list-item v-if="nav.route" :key="'nav.link.' + index" :to="{ name: nav.route }" @click.stop="$emit('route')">
        <v-list-item-icon>
          <v-icon>{{ nav.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ nav.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="nav.divider" :key="'nav.divider.' + index"></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { NavigationLink } from "~common/model/NavigationLink";

@Component
export default class AppMenu extends Vue {
  @Prop(Array) links!: NavigationLink[];
}
</script>
