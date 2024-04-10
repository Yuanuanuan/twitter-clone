import axios, { AxiosInstance } from "axios";
import { ILoginData, IRegistData } from "../types";

const BASE_URL: string = "http://localhost:8081";
const defaultAvatarURL =
  "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
const defaultCoverURL =
  "https://png.pngtree.com/thumb_back/fh260/background/20220318/pngtree-pure-grey-cover-medium-grey-image_1036235.jpg";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

api.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function getUserInfo() {
  const res = await api.get("/accountInfo");

  return res.data;
}

export async function getAllTweets(backToken?: string | null) {
  const token = getToken();
  const currentToken = backToken ? backToken : token;
  const res = await api.get("/tweets", {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  });

  for (let item of res.data) {
    if (!item.avatarURL) {
      item.avatarURL = defaultAvatarURL;
    }
  }

  return res.data;
}

export async function getSelfTweets() {
  const res = await api.get("/selfTweets");

  return res.data;
}

export async function login(loginInfo: ILoginData) {
  console.log("login");
  const res = await api.post("/login", loginInfo);
  if (!res.data.status) {
    return;
  }
  return res.data;
}

export async function BackStageLogin(loginInfo: ILoginData) {
  return await api.post("/admin/login", loginInfo);
}

export async function getAllUsers() {
  return await api.get("/admin/users");
}

export async function regist(data: IRegistData) {
  return await api.post("regist", data);
}

export async function updateUserInfo(data: any, userID: number) {
  return await api.patch("/accountInfo", { data, userID });
}

export async function updateAvatarImg(data: FormData) {
  const res = await api.patch("/upload/avatarImg", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export async function updateCoverImg(data: FormData) {
  const res = await api.patch("/upload/coverImg", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}
