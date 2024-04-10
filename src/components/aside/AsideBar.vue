<template>
  <section class="aside-wrapper">
    <main>
      <div class="title">Popular</div>
      <UserItem :following="true" />
      <UserItem :following="false" />
      <UserItem :following="false" />
      <UserItem :following="false" />
      <UserItem :following="true" />
      <UserItem :following="false" />
      <UserItem :following="false" />
    </main>
  </section>
</template>

<script setup lang="ts">
import UserItem from "./UserItem.vue";
</script>

<style scoped lang="scss">
.aside-wrapper {
  width: 27vw;
  min-width: 250px;
  padding: 12px 16px;
  border-left: 1px solid #e6ecf0;

  display: flex;
  justify-content: center;
  main {
    width: 100%;
    height: fit-content;
    background-color: #f5f8fa;
    border-radius: 14px;
    overflow: hidden;
    .title {
      height: 36px;
      padding: 0 12px;
      border-bottom: 1px solid #e6ecf0;
      font-size: 18px;
      font-weight: 600;

      display: flex;
      align-items: center;
    }
  }
}
</style>
