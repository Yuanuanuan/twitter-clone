<template>
  <section>
    <nav>
      <div class="logo-icon">
        <LogoIcon />
      </div>
      <div
        class="tool"
        :class="{ active: menu === 'tweet-list' }"
        @click="changeTool('/admin')"
      >
        <HomeIcon :active="menu === 'tweet-list' ? true : false" />
        <h2>Tweet List</h2>
      </div>
      <div
        class="tool"
        :class="{ active: menu === 'user-list' }"
        @click="changeTool('/admin/user')"
      >
        <UserIcon :active="menu === 'user-list' ? true : false" />
        <h2>User List</h2>
      </div>
    </nav>
    <div class="logout-btn">
      <LogoutIcon />
      <button @click="logOut">Log Out</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeIcon from "./icons/HomeIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import LogoutIcon from "./icons/LogoutIcon.vue";
import LogoIcon from "./icons/LogoIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

type Menu = "tweet-list" | "user-list";

const menu = computed<Menu>(() => {
  const value = route.path.split("/").pop();
  if (value === "user") {
    return "user-list";
  }
  return "tweet-list";
});

function changeTool(path: any) {
  router.push(path);
}

function logOut() {
  localStorage.removeItem("backToken");
  router.push("/admin/login");
}
</script>

<style scoped lang="scss">
section {
  width: 23%;
  min-width: 200px;
  padding: 18px;
  border-right: 1px solid #e6ecf0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  nav {
    margin-top: 18px;
    min-width: 160px;
    .logo-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tool {
      margin: 20px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      letter-spacing: 1px;
      cursor: pointer;
      h2 {
        margin-left: 12px;
        font-weight: 500;
        font-size: 18px;
        color: #444;
      }
      &.active h2 {
        color: #ff6600;
      }
    }
    .tweet-btn {
      cursor: pointer;
      button {
        width: 100%;
        height: 35px;
        appearance: none;
        border: none;
        background-color: #ff6600;
        color: #fff;
        border-radius: 50px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .logout-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      appearance: none;
      border: none;
      background-color: transparent;
      font-size: 16px;
      margin-left: 6px;
      cursor: pointer;
    }
  }
}
</style>
