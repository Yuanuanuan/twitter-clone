<template>
  <ReplyItem v-for="reply in replyList" :key="reply.id" :reply="reply" />
</template>

<script setup lang="ts">
import ReplyItem from "./ReplyItem.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

interface IReply {
  id: number;
  body: string;
  user: {
    username: string;
    id: number;
  };
}

const replyList = ref<IReply[]>([]);

onMounted(async () => {
  const res = await axios.get("https://dummyjson.com/comments");
  replyList.value = res.data.comments;
});
</script>
