<template>
  <section>
    <LogoIcon :size="110" class="logo" />
    <h1>Not Found...</h1>
    <div class="link-box flex">
      <RouterLink to="/home" class="link">Go To The Home Page</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import LogoIcon from "./icons/LogoIcon.vue";
</script>

<style scoped lang="scss">
section {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .logo {
    margin-top: 10rem;
  }
  h1 {
    font-size: 64px;
    color: #838282;
    font-weight: 900;
    margin-top: 2rem;
  }
  .link-box {
    margin-top: 2rem;
    padding: 12px;
    border-radius: 50px;
    width: 250px;
    height: 50px;
    border: 2px solid #ff6600;
    background-color: #fff;
    transition: all 0.3s ease-out;
    .link {
      color: #ff6600;
      text-decoration: none;
      font-size: 18px;
    }
    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 5px 5px 5px #838282;
    }
  }
}
</style>
