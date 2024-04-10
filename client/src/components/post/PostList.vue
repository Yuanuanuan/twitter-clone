<template>
  <PostItem
    v-if="props.postList.length > 0"
    v-for="post in props.postList"
    :key="post?.id"
    :post="post"
  />
  <h1 v-else>There is nothing...</h1>
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";
import { onMounted, ref } from "vue";
import { getAllTweets } from "../../api";
import { ITweet_User } from "../../types";

type PostListProps = {
  postList: ITweet_User[];
};

const postList = ref<ITweet_User[]>([]);

const props = defineProps<PostListProps>();

onMounted(async () => {
  postList.value = await getAllTweets();
});
</script>
