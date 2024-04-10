<template>
  <Teleport to="body">
    <section v-if="isValid" class="user-info-dialog">
      <div class="user-info-wrapper">
        <div class="header flex">
          <div class="close-icon">
            <CloseIcon @click="isValid = false" />
          </div>
          <h1>Edit Your Profile</h1>
          <button type="submit" form="user-form">Save</button>
        </div>
        <div class="content">
          <form id="user-form" @submit.prevent="handleSubmit">
            <div class="cover-img-box">
              <img :src="newInfo.coverURL" />
              <div class="tools">
                <div class="file-input-box">
                  <input
                    id="cover-input"
                    type="file"
                    name="avatarImg"
                    accept="image/*"
                    @change="coverImageChange"
                  />
                  <label for="cover-input">
                    <UpdatePhoto />
                  </label>
                </div>
                <div v-if="newInfo.coverURL" class="delete-icon">
                  <CloseIcon color="white" />
                </div>
              </div>
              <div class="user-img">
                <img :src="newInfo.avatarURL" />
                <div class="file-input-box">
                  <input
                    id="user-input"
                    type="file"
                    name="coverImg"
                    accept="image/*"
                    @change="userImageChange"
                  />
                  <label for="user-input">
                    <UpdatePhoto />
                  </label>
                </div>
              </div>
            </div>
            <div class="info-input">
              <BaseInput
                label="Account"
                name="account"
                v-model:input="newInfo.account"
              />
              <textarea
                :class="introduceValueIsValid ? '' : 'error'"
                name="introduce"
                v-model="newInfo.introduce"
                placeholder="Introduce yourself..."
                @blur="blurTextArea"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Teleport>
  <HintDialog v-if="dialogFlag" :mode="dialogMode" :message="dialogMessage" />
</template>

<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import UpdatePhoto from "../icons/UpdatePhoto.vue";
import BaseInput from "../UI/BaseInput.vue";
import HintDialog from "./HintDialog.vue";
import { ref, reactive } from "vue";
import { useUserStore } from "../../store";
import { updateAvatarImg, updateCoverImg, updateUserInfo } from "../../api";

const userStore = useUserStore();

let avatarFormData = new FormData();
let coverFormData = new FormData();

const isValid = ref(false);
const introduceValueIsValid = ref(true);
const dialogMode = ref("success");
const dialogMessage = ref("");
const dialogFlag = ref(false);

const currentInfo: Record<string, string> = userStore.userInfo;

const newInfo = reactive({ ...currentInfo });

defineExpose({
  open() {
    isValid.value = true;
  },
  close() {
    isValid.value = false;
  },
});

function coverImageChange(e: any) {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    newInfo.coverURL = e.target.result;
    coverFormData.append("coverImg", e.target.result);
    coverFormData.append("userID", currentInfo.id.toString());
  };
  reader.readAsDataURL(file);
}

function userImageChange(e: any) {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    newInfo.avatarURL = e.target.result;
    avatarFormData.append("avatarImg", e.target.result);
    avatarFormData.append("userID", currentInfo.id.toString());
  };
  reader.readAsDataURL(file);
}

function blurTextArea() {
  if (!newInfo.introduce) {
    introduceValueIsValid.value = false;
    return;
  }
  introduceValueIsValid.value = true;
}

async function handleSubmit() {
  const { account, introduce, avatarURL, coverURL } = newInfo;
  const items = ["account", "introduce", "avatarURL", "coverURL"];
  let updateData: null | Record<string, string> = {};

  for (let item of items) {
    if (currentInfo[item] !== newInfo[item]) {
      return;
    }
  }

  if (account !== currentInfo.account || introduce !== currentInfo.introduce) {
    // 判斷圖片有沒有改變 如果有就拆分開來處理
    if (newInfo.avatarURL !== currentInfo.avatarURL) {
      const res = await updateAvatarImg(avatarFormData);
      console.log(res);
    }
    if (newInfo.coverURL !== currentInfo.coverURL) {
      const res = await updateCoverImg(coverFormData);
      console.log(res);
    }

    updateData.account = account;
    updateData.introduce = introduce;

    const res = await updateUserInfo(updateData, currentInfo.id);

    if (!res.data.status) {
      showDialog("error", res.data.message);
      return;
    }

    showDialog("success", res.data.message);
    await userStore.refreshUserInfo();
    isValid.value = false;
  }
}

function showDialog(mode: string, msg: string) {
  dialogMode.value = mode;
  dialogMessage.value = msg;
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
.user-info-dialog {
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  .user-info-wrapper {
    width: 570px;
    height: 600px;
    margin-top: 24px;
    background-color: #fff;
    border-radius: 14px;
    .header {
      height: 50px;
      padding: 16px;
      border-bottom: 1px solid #e6ecf0;
      .close-icon {
        width: 50px;
      }
      h1 {
        flex: 1;
        font-size: 19px;
        font-weight: 700;
      }
      button {
        width: 60px;
        height: 30px;
        border-radius: 40px;
        background-color: #ff6600;
        color: #fff;
        font-size: 15px;
      }
    }
    .content {
      height: calc(100% - 50px);
      #user-form {
        height: 100%;
        display: flex;
        flex-direction: column;
        .cover-img-box {
          width: 100%;
          height: 200px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &::after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #ffffff30;
            pointer-events: none;
          }
          .tools {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
          }
          .user-img {
            position: absolute;
            bottom: 0;
            left: 24px;
            transform: translateY(50%);
            z-index: 5;
            background-color: #fff;
            border-radius: 50%;
            img {
              width: 110px;
              height: 110px;
              border: 5px solid #fff;
              border-radius: 50%;
            }
            .file-input-box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            &::after {
              content: "";
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: #ffffff30;
              pointer-events: none;
            }
          }
        }
        .info-input {
          flex: 1;
          padding: 4rem 16px 2rem 16px;
          display: flex;
          flex-direction: column;
          textarea {
            appearance: none;
            border: none;
            outline: none;
            resize: none;
            width: 100%;
            height: 100%;
            margin-top: 1rem;
            padding: 8px;
            font-size: 18px;
            font-family: "sans-serif";
            background-color: #f5f8fa;
            border-bottom: 2px solid #222;
            &:focus,
            &:hover {
              border-bottom: 2px solid #50b5ff;
            }
            &.error {
              border-bottom: 2px solid #fc5a5a;
            }
          }
        }
      }
    }
  }
}

input[type="file"] {
  display: none;
}
</style>
