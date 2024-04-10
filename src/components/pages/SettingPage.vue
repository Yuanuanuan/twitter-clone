<template>
  <section>
    <div class="title">Setting for Accounts</div>
    <section class="set-form">
      <AccountForm @handleSubmit="handleSubmit" :formData="newAccountData">
        <div class="save-btn">
          <button>Save</button>
        </div>
      </AccountForm>
    </section>
  </section>
  <HintDialog v-if="dialogFlag" :mode="dialogMode" :message="dialogMsg" />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import AccountForm from "../form/AccountForm.vue";
import { useUserStore } from "../../store";
import { updateUserInfo } from "../../api";
import { IRegistData } from "../../types";
import HintDialog from "../dialog/HintDialog.vue";

const userStore = useUserStore();

const { account, username, email } = userStore.userInfo;

const dialogMsg = ref("");
const dialogMode = ref("success");
const dialogFlag = ref(false);

const currentAccountData: IRegistData = {
  account,
  username,
  email,
  password: "",
  confirmPassword: "",
};

const newAccountData = reactive<IRegistData>({ ...currentAccountData });

async function handleSubmit() {
  const updateData: IRegistData = {};
  for (let key in newAccountData) {
    if (newAccountData[key] !== currentAccountData[key]) {
      updateData[key] = newAccountData[key];
    }
  }

  if (!updateData) {
    return;
  } else {
    const res = await updateUserInfo(updateData, userStore.userInfo.id);
    console.log(res);
    if (!res.data.status) {
      dialogMsg.value = res.data.message;
    }
    userStore.refreshUserInfo();
  }
}
</script>

<style scoped lang="scss">
section {
  flex: 1;
  .title {
    height: 50px;
    padding-left: 12px;
    border-bottom: 1px solid #e6ecf0;
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .set-form {
    padding: 12px;
    .save-btn {
      align-self: flex-end;
      button {
        appearance: none;
        width: 100px;
        height: 40px;
        border-radius: 50px;
        border: none;
        background-color: #ff6600;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
