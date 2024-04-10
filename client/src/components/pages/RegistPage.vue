<template>
  <FormSection title="Sign up">
    <AccountForm @handleSubmit="handleSubmit" :formData="registData">
      <h4>{{ errorMsg }}</h4>
      <div class="buttons">
        <button class="regist-btn" type="submit">Regist</button>
        <button class="cancel-btn" type="button">
          <RouterLink to="/login">Cancel</RouterLink>
        </button>
      </div>
    </AccountForm>
  </FormSection>
  <HintDialog
    v-if="dialogFlag"
    :mode="registState.mode"
    :message="registState.message"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FormSection from "../form/FormSection.vue";
import AccountForm from "../form/AccountForm.vue";
import HintDialog from "../dialog/HintDialog.vue";
import { IRegistData } from "../../types";
import { regist } from "../../api";
import { useRouter } from "vue-router";

const router = useRouter();

const registData = reactive<IRegistData>({
  account: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const registState = reactive({
  mode: "",
  message: "",
});

const errorMsg = ref("");
const dialogFlag = ref(false);

async function handleSubmit() {
  const requiredFields = [
    "account",
    "username",
    "email",
    "password",
    "confirmPassword",
  ];

  for (const field of requiredFields) {
    if (registData[field] === "") {
      errorMsg.value = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } can't be empty!`;
      return;
    }
  }

  if (registData.confirmPassword !== registData.password) {
    errorMsg.value = "Make sure password is the same!";
    return;
  }

  errorMsg.value = "";

  try {
    const res = await regist(registData);
    if (res.data.status) {
      registState.mode = "success";
    } else {
      registState.mode = "error";
    }
    registState.message = res.data.message;
  } catch (err: any) {
    registState.mode = "error";
    registState.message = err.response.data.message;
  } finally {
    await showDialog();
    if (registState.mode === "success") {
      await router.push("/login");
    }
  }

  // const res = await axios.get("https://dummyjson.com/users");

  // const users = res.data.users;

  // for (let user of users) {
  //   const data = {
  //     account: user.username,
  //     username: user.firstName + " " + user.lastName,
  //     email: user.email,
  //     password: user.password,
  //     avatarURL: user.image,
  //   };

  //   await api.post("/regist", data);
  // }

  // const res = await axios.get("https://dummyjson.com/posts");

  // console.log(res.data.posts);

  // const posts = res.data.posts;

  // for (let post of posts) {
  //   const random = Math.floor(Math.random() * (129 - 99) + 99);

  //   const data = {
  //     userID: random,
  //     content: post.body,
  //   };

  //   await api.post("/tweet", data);
  // }
}

// Open the Hint Dialog
function showDialog() {
  dialogFlag.value = true;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      dialogFlag.value = false;
      resolve();
    }, 1500);
  });
}
</script>

<style scoped lang="scss">
h4 {
  color: red;
  font-size: 18px;
  font-weight: 700;
  font-style: italic;
  margin: 0 0 -12px 0;
}
.buttons {
  width: 100%;
  button {
    appearance: none;
    width: 100%;
    height: 46px;
    border: none;
    font-size: 16px;
    margin: 4px 0;
    cursor: pointer;
  }
  .regist-btn {
    background-color: #ff6600;
    color: #fff;
    border-radius: 50px;
  }
  .cancel-btn {
    background-color: transparent;
    a {
      color: #0099ff;
    }
  }
}
</style>
