<template>
  <section>
    <div class="left">
      <img :src="post.avatarURL" />
    </div>
    <div class="right">
      <div class="title">
        <div>
          {{ post.username }}
          <span class="details">@{{ post.account }}・Jane 23</span>
        </div>
      </div>
      <div class="content">
        <p>{{ post.content }}</p>
      </div>
      <div class="tools">
        <div class="tool">
          <MessageIcon />
          <div class="sum">22</div>
        </div>
        <div class="tool">
          <LoveIcon />
          <div class="sum" :class="1 == 1 ? 'love' : ''">76</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import LoveIcon from "../icons/LoveIcon.vue";
import MessageIcon from "../icons/MessageIcon.vue";
import { ITweet_User } from "../../types";

defineProps({
  post: {
    type: Object as PropType<ITweet_User>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
section {
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  .left {
    width: 60px;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    .title {
      font-weight: 700;
      font-size: 15px;
      span {
        color: #657786;
        font-weight: normal;
        font-size: 14px;
      }
    }
    .content {
      padding-right: 8px;
      p {
        margin: 2px 0;
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-wrap: none;
      }
    }
    .tools {
      color: #657786;
      font-size: 14px;
      margin-top: 4px;
      display: flex;
      .tool {
        display: flex;
        justify-content: center;
        align-items: center;
        .sum {
          margin: 0 4px;
        }
        .love {
          color: #e0245e;
        }
      }
    }
  }
}
</style>
