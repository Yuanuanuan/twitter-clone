<template>
  <section>
    <div class="title">Home</div>
    <div class="tweet-box">
      <form @submit.prevent="handleSubmit">
        <div class="post-content">
          <img :src="userStore.userInfo.avatarURL" />
          <textarea
            v-model="postContent"
            name="post"
            placeholder="What's news?"
          />
        </div>
        <button>Tweet</button>
      </form>
    </div>
    <div class="post-list">
      <PostList :postList="postList" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PostList from "../post/PostList.vue";
import { useUserStore } from "../../store";
import { ITweet_User } from "../../types";
import { getAllTweets } from "../../api";

const userStore = useUserStore();

const postContent = ref("");
const postList = ref<ITweet_User[]>([]);

function handleSubmit() {
  console.log("submit");
}

onMounted(async () => {
  postList.value = await getAllTweets();
});
</script>

<style scoped lang="scss">
section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .title {
    height: 50px;
    padding: 16px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    border-bottom: 1px solid #e6ecf0;
  }
  .tweet-box {
    height: 120px;
    border-bottom: 10px solid #e6ecf0;
    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .post-content {
        flex: 1;
        width: 100%;
        display: flex;
        img {
          width: 50px;
          height: 50px;
          margin: 4px;
          border-radius: 50%;
          object-fit: cover;
        }
        textarea {
          width: 100%;
          padding: 8px;
          resize: none;
          border: none;
          outline: none;
          font-size: 16px;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      button {
        margin: 4px 12px 8px 0;
        appearance: none;
        width: 60px;
        height: 30px;
        border: none;
        border-radius: 50px;
        background-color: #ff6600;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .post-list {
    flex: 1;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
