<template>
  <v-container>
    <h1>Database {{ $route.params.name }}</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ViewDatabase extends Vue {}
</script>
