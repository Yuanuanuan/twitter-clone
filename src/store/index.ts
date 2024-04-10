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
        this.setUserInfo(res.userInfo);
      }

      console.log("refresh");

      return this.userInfo;
    },
    setUserInfo(data: any) {
      this.userInfo = data;
    },
  },
});
