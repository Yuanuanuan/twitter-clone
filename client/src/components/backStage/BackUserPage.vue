<template>
  <section>
    <header>User List</header>
    <section class="user-list-wrapper">
      <div class="user-list">
        <BackUserItem v-for="user in userList" :key="user.id" :user="user" />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import BackUserItem from "./BackUserItem.vue";
import { onMounted, ref } from "vue";
import { IUser } from "../../types";
import { getAllUsers } from "../../api";

const userList = ref<IUser[]>();

onMounted(async () => {
  const res = await getAllUsers();
  userList.value = res.data;
});
</script>

<style scoped lang="scss">
section {
  flex: 1;
  header {
    width: 100%;
    height: 50px;
    padding-left: 16px;
    border-bottom: 1px solid #e6ecf0;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .user-list-wrapper {
    width: 100%;
    height: 100%;
    padding-bottom: 4rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .user-list {
      padding: 16px;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
      grid-auto-flow: row;
      gap: 16px;
    }
  }
}
</style>
