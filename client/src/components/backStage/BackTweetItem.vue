<template>
  <div class="wrapper">
    <div class="user-img">
      <img :src="tweet.avatarURL" />
    </div>
    <div class="content">
      <h3>
        {{ tweet.username }}
        <span>@{{ tweet.account }}・{{ time }}</span>
      </h3>
      <p>{{ tweet.content }}</p>
    </div>
    <CloseIcon color="#657786" :big="20" />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import CloseIcon from "../icons/CloseIcon.vue";
import { ITweet_User } from "../../types";

const props = defineProps({
  tweet: {
    type: Object as PropType<ITweet_User>,
    required: true,
  },
});

const time = computed(() => {
  const time = props.tweet.createAt;
  const date = new Date(time);
  return date.toLocaleDateString("en-CA", { month: "2-digit", day: "2-digit" });
});
</script>

<style scoped lang="scss">
.wrapper {
  height: 60px;
  padding: 8px;
  border-bottom: 1px solid #e6ecf0;
  position: relative;
  display: flex;
  justify-content: center;
  .user-img {
    margin-right: 8px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .content {
    flex: 1;
    h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
      span {
        color: #657786;
        font-size: 15px;
        font-weight: normal;
      }
    }
    p {
      width: 450px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
