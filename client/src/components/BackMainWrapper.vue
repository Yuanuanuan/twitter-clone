import BackNavBar from './BackNavBar.vue';
<template>
  <main>
    <BackNavBar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import BackNavBar from "./BackNavBar.vue";
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
