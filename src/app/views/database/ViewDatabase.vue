<template>
  <v-container>
    <h1>Database {{ databaseName }}</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ViewDatabase extends Vue {
  get databaseName(): string {
    return this.$route.params.name;
  }
}
</script>
