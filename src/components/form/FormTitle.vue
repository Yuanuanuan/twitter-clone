<template>
  <LogoIcon :size="60" />
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import LogoIcon from "../icons/LogoIcon.vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
h1 {
  margin: 1rem 0 2rem;
  font-size: 2rem;
  color: #ff4000;
}
</style>
