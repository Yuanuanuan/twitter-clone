<template>
  <section>
    <div class="left">
      <img src="https://robohash.org/Terry.png?set=set4" />
    </div>
    <div class="right">
      <div class="title">
        <div>
          {{ reply.user.username }}
          <span class="details">@atuny0・Jane 23</span>
        </div>
        <div>
          <span class="details">reply </span>
          <span class="reply-span">@Daniel</span>
        </div>
      </div>
      <div class="content">
        <p>{{ reply.body }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";

interface IReply {
  id: number;
  body: string;
  user: {
    username: string;
    id: number;
  };
}

defineProps({
  reply: {
    type: Object as PropType<IReply>,
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
      .details {
        color: #657786;
        font-weight: normal;
        font-size: 14px;
      }
      .reply-span {
        color: #ff6600;
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
  }
}
</style>
