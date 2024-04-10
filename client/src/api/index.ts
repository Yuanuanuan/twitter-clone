import axios, { AxiosInstance } from "axios";
import { ILoginData, IRegistData } from "../types";

const BASE_URL: string = "http://localhost:8081";
const defaultAvatarURL =
  "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
// const defaultCoverURL =
//   "https://png.pngtree.com/thumb_back/fh260/background/20220318/pngtree-pure-grey-cover-medium-grey-image_1036235.jpg";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

api.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

function getToken() {
  return localStorage.getItem("token") || "";
}

/** 獲取使用者資訊 */
export async function getUserInfo() {
  const res = await api.get("/accountInfo");

  return res.data;
}

/** 獲取所有推文 */
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

/** 獲取自己的所有貼文 */
export async function getSelfTweets(id: number) {
  console.log(id);
  const res = await api.get("/selfTweets", { params: { userID: id } });

  return res.data;
}

/** 登入 */
export async function login(loginInfo: ILoginData) {
  console.log("login");
  const res = await api.post("/login", loginInfo);
  if (!res.data.status) {
    return;
  }
  return res.data;
}

/** 後台登入 */
export async function BackStageLogin(loginInfo: ILoginData) {
  return await api.post("/admin/login", loginInfo);
}

/** 獲取所有使用者 */
export async function getAllUsers() {
  return await api.get("/admin/users");
}

/** 註冊 */
export async function regist(data: IRegistData) {
  return await api.post("regist", data);
}

/** 更新使用者資訊 */
export async function updateUserInfo(data: any, userID: number) {
  return await api.patch("/accountInfo", { data, userID });
}

/** 更新使用者頭像 */
export async function updateAvatarImg(data: FormData) {
  const res = await api.patch("/upload/avatarImg", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

/** 更新使用者背景圖片 */
export async function updateCoverImg(data: FormData) {
  const res = await api.patch("/upload/coverImg", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}
