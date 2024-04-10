<template>
  <section>
    <FormTitle :title="title" />
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import FormTitle from "./FormTitle.vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 100vh;
  padding-top: 2rem;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
