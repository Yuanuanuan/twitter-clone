<template>
  <FormSection title="Log in">
    <LoginForm @login="handleLogin" :msg="errorMsg" />
    <div class="foot">
      <RouterLink to="/regist">Sign up</RouterLink>
      <RouterLink to="/admin/login">BackStage</RouterLink>
    </div>
  </FormSection>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import LoginForm from "../form/LoginForm.vue";
import FormSection from "../form/FormSection.vue";
import { ILoginData } from "../../types";
import { useUserStore } from "../../store";
import { login } from "../../api";

const userStore = useUserStore();

const router = useRouter();

const errorMsg = ref("");

async function handleLogin(loginInfo: ILoginData) {
  try {
    const res = await login(loginInfo);

    if (!res.status) return;
    localStorage.setItem("token", res.token);
    await userStore.refreshUserInfo();
    router.push("/home");
  } catch (err: any) {
    errorMsg.value = err.response.data.message;
  }
}
</script>

<style scoped lang="scss">
.foot {
  width: 540px;
  margin: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  a {
    margin: 0 0.4rem;
    color: #0099ff;
  }
}
</style>
