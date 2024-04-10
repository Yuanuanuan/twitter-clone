<template>
  <section class="profile-wrapper">
    <div class="title">
      <ArrowIcon @click="clickBack" />
      <div class="header">
        <h1 class="username">{{ userInfo.username }}</h1>
        <h3 class="post-sum">{{ totalTweet }} tweet</h3>
      </div>
    </div>
    <section class="info">
      <div class="info-img">
        <img :src="userInfo.coverURL" />
        <div class="user-img flex">
          <img :src="userInfo.avatarURL" />
        </div>
      </div>
      <div class="edit-btn">
        <button @click="profileDialogRef.open">Edit Profile</button>
        <ProfileDialog ref="profileDialogRef" />
      </div>
      <div class="info-details">
        <div class="name-account">
          <h2>{{ userInfo.username }}</h2>
          <h3>@{{ userInfo.account }}</h3>
        </div>
        <p class="desc">
          {{ userInfo.introduce }}
        </p>
        <div class="follow-box">
          <div>
            <b>{{ userInfo.following_count }}</b>
            <span>Following</span>
          </div>
          <div>
            <b>{{ userInfo.follower_count }}</b>
            <span>Follower</span>
          </div>
        </div>
      </div>
      <div class="tools-bar">
        <div
          class="tool"
          :class="tool === 'tweet' ? 'active' : null"
          @click="changeTool('/profile')"
        >
          Tweet
        </div>
        <div
          class="tool"
          :class="tool === 'tweet&reply' ? 'active' : null"
          @click="changeTool('/profile/tweet-reply')"
        >
          Tweet & Reply
        </div>
        <div
          class="tool"
          :class="tool === 'liked' ? 'active' : null"
          @click="changeTool('/profile/liked')"
        >
          Liked
        </div>
      </div>
    </section>
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import ArrowIcon from "../icons/ArrowIcon.vue";
import { useRouter, RouterView, useRoute } from "vue-router";
import { ref, reactive, computed } from "vue";
import ProfileDialog from "../dialog/ProfileDialog.vue";
import { useUserStore } from "../../store";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const profileDialogRef = ref();
const totalTweet = ref(0);
const userInfo = reactive(userStore.userInfo);

const tool = computed(() => {
  const path = route.path.split("/").pop();
  if (path === "profile") return "tweet";
  if (path === "tweet-reply") return "tweet&reply";
  if (path === "liked") return "liked";
});

function changeTool(path: string) {
  router.push(path);
}

function clickBack() {
  router.go(-1);
}
</script>

<style scoped lang="scss">
.profile-wrapper {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    border-bottom: 1px solid #e6ecf0;
    padding: 4px 0 4px 12px;
    display: flex;
    align-items: center;
    .header {
      margin-left: 24px;
      h1 {
        font-size: 20px;
        font-weight: 900;
        line-height: 26px;
      }
      h3 {
        font-size: 12px;
        line-height: 14px;
        color: #657786;
      }
    }
  }
  .info {
    width: 100%;
    border-bottom: 1px solid #e6ecf0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .info-img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .user-img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 20px;
        transform: translateY(50%);
        img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .edit-btn {
      width: 100%;
      margin-bottom: 2.2rem;
      display: flex;
      justify-content: flex-end;
      button {
        appearance: none;
        border: none;
        width: 120px;
        height: 35px;
        margin: 4px 10px;
        border-radius: 40px;
        border: 1px solid #ff6600;
        background-color: transparent;
        color: #ff6600;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          background-color: #ff6600;
          color: #fff;
        }
      }
    }
    .info-details {
      padding: 0 16px;
      .name-account {
        h2 {
          font-weight: bold;
          font-size: 20px;
        }
        h3 {
          font-size: 15px;
          font-weight: 500;
          color: #657786;
        }
      }
      .desc {
        margin: 4px 0;
        font-size: 14px;
      }
      .follow-box {
        div {
          display: inline-block;
          font-size: 14px;
          b {
            margin-right: 4px;
          }
          span {
            color: #657786;
            margin-right: 16px;
          }
        }
      }
    }
    .tools-bar {
      display: flex;
      .tool {
        width: 110px;
        height: 50px;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &.active {
          color: #ff6600;
          border-bottom: 2px solid #ff6600;
        }
      }
    }
  }
}
</style>
