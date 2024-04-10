import { defineStore } from "pinia";
import { IUser } from "../types";
import { getUserInfo } from "../api";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: <IUser>{},
  }),
  getters: {
    token: () => {
      const token = localStorage.getItem("token");
      if (token) {
        return token;
      } else {
        return "";
      }
    },
  },
  actions: {
    async refreshUserInfo() {
      if (this.token) {
        const res = await getUserInfo();
        this.userInfo = res.userInfo;
        console.log(res.userInfo.avatarURL);

        if (!res.userInfo.avatarURL) {
          this.setAvatarDefault();
        }
      }

      return this.userInfo;
    },
    setAvatarDefault() {
      this.userInfo.avatarURL =
        "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
    },
  },
});
