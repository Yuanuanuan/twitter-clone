<template>
  <main>
    <RouterView />
  </main>
  <AsideBar />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AsideBar from "./aside/AsideBar.vue";
</script>

<style scoped lang="scss">
main {
  flex: 1;
}
</style>
