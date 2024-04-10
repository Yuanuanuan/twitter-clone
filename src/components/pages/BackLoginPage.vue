<template>
  <FormSection title="BackStage Log in">
    <LoginForm @login="handleLogin" :msg="errorMsg" />
    <div class="foot">
      <RouterLink to="/login">FrontStage</RouterLink>
    </div>
  </FormSection>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import LoginForm from "../form/LoginForm.vue";
import FormSection from "../form/FormSection.vue";
import { ref } from "vue";
import { ILoginData } from "../../types";
import { BackStageLogin } from "../../api";

const router = useRouter();

const errorMsg = ref("");

async function handleLogin(loginInfo: ILoginData) {
  try {
    const res = await BackStageLogin(loginInfo);
    if (!res.status) {
      errorMsg.value = res.data.message;
      return;
    }
    localStorage.setItem("backToken", res.data.token);
    router.push("/admin");
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
