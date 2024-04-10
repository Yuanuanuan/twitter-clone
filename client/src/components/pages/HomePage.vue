<template>
  <main>
    <NavBar />
    <RouterView></RouterView>
  </main>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import NavBar from "../NavBar.vue";
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
