<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import NavBar from "../NavBar.vue";
import { onMounted } from "vue";
import { useUserStore } from "../../store";

const userStore = useUserStore();

onMounted(async () => {
  userStore.refreshUserInfo();
});
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
