<template>
  <div></div>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewDatabase extends Vue {
  @Getter("darkMode", { namespace: "userSettings" }) darkMode!: boolean;
}
</script>
