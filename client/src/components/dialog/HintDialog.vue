<template>
  <Teleport to="body">
    <section class="flex">
      <div class="dialog-wrapper">
        <SuccessIcon v-if="mode === 'success'" />
        <ErrorIcon v-else />
        <h2>{{ message }}</h2>
      </div>
    </section>
  </Teleport>
</template>

<script setup lang="ts">
import SuccessIcon from "../icons/SuccessIcon.vue";
import ErrorIcon from "../icons/ErrorIcon.vue";

defineProps({
  mode: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
section {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  inset: 0;
  .dialog-wrapper {
    width: 350px;
    height: auto;
    padding: 2rem 0 0;
    background-color: #f5f6f7;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      margin: 1.5rem 0 2.5rem;
      font-size: 20px;
    }
  }
}
</style>
