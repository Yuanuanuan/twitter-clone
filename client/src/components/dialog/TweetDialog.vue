<template>
  <Teleport to="body">
    <section v-if="isValid">
      <div class="tweet-post">
        <div class="header">
          <CloseIcon @click="isValid = false" />
        </div>
        <div class="content">
          <form @submit.prevent="handleSubmit">
            <textarea
              v-model="postContent"
              name="post"
              placeholder="What's news?"
            />
            <button>Tweet</button>
          </form>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";
import { ref } from "vue";

const isValid = ref(false);
const postContent = ref("");

defineExpose({
  open() {
    isValid.value = true;
  },
  close() {
    isValid.value = false;
  },
});

function handleSubmit() {
  console.log("submit");
}
</script>

<style scoped lang="scss">
section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  .tweet-post {
    width: 550px;
    height: 450px;
    margin-top: 24px;
    background-color: #fff;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    .header {
      height: 40px;
      padding: 12px;
      border-bottom: 1px solid #e6ecf0;
      display: flex;
      align-items: center;
    }
    .content {
      flex: 1;
      form {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        textarea {
          width: 100%;
          flex: 1;
          padding: 16px;
          resize: none;
          border: none;
          outline: none;
          border-radius: 14px;
          font-size: 16px;
        }
        button {
          margin: 8px 8px 8px 0;
          appearance: none;
          width: 80px;
          height: 40px;
          border: none;
          border-radius: 50px;
          background-color: #ff6600;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
