<template>
  <PostItem v-for="post in postList" :key="post?.id" :post="post" />
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";
import { onMounted, ref } from "vue";
import { getAllTweets } from "../../api";
import { ITweet_User } from "../../types";

const postList = ref<ITweet_User[]>([]);

onMounted(async () => {
  postList.value = await getAllTweets();
});
</script>
