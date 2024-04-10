<template>
  <PostList :postList="postList" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PostList from "../post/PostList.vue";
import { getSelfTweets } from "../../api";
import { useUserStore } from "../../store";
import { ITweet_User } from "../../types";

const userStore = useUserStore();

const postList = ref<ITweet_User[]>([]);

onMounted(async () => {
  postList.value = await getSelfTweets(userStore.userInfo.id);
  console.log(postList.value);
});
</script>
