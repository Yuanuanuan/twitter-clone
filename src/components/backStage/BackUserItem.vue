<template>
  <div class="card-wrapper">
    <div class="top">
      <img :src="user.coverURL" class="cover" />
      <div class="user-img-box">
        <img :src="user.avatarURL" class="user-img" />
      </div>
    </div>
    <div class="bottom flex">
      <div class="info">
        <div class="user">
          <h3>{{ user.username }}</h3>
          <h4>@{{ user.account }}</h4>
        </div>
        <div class="tools flex">
          <div class="tool flex">
            <MessageIcon />
            <h4>1.5k</h4>
          </div>
          <div class="tool flex">
            <LoveIcon />
            <h4>20k</h4>
          </div>
        </div>
        <div class="follow flex">
          <h3>34 <span>following</span></h3>
          <h4>59 <span>follower</span></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import MessageIcon from "../icons/MessageIcon.vue";
import LoveIcon from "../icons/LoveIcon.vue";
import { IUser } from "../../types";

defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.card-wrapper {
  height: 280px;
  border-radius: 14px;
  .top {
    width: 100%;
    height: 47%;
    background-color: #c4c4c4;
    position: relative;
    border-radius: 14px 14px 0 0;
    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px 14px 0 0;
    }
    .user-img-box {
      width: 95px;
      height: 95px;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 25%);
      background-color: #c4c4c4;
      border: 5px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .user-img {
        width: 88px;
        height: 88px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  .bottom {
    height: 53%;
    background-color: #f6f7f8;
    border-radius: 0 0 14px 14px;
    .user {
      margin-top: 8px;
      text-align: center;
      h3 {
        font-size: 18px;
        font-weight: 900;
        line-height: 20px;
      }
      h4 {
        font-size: 15px;
        font-weight: normal;
        line-height: 20px;
        color: #657786;
      }
    }
    .tools {
      margin: 8px 0;
      .tool {
        width: 60px;
        h4 {
          margin-left: 4px;
          font-size: 14px;
        }
      }
    }
    .follow {
      font-size: 14px;
      font-weight: 500;
      gap: 8px;
      margin-top: 8px;
      span {
        color: #657786;
        font-weight: normal;
      }
    }
  }
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
