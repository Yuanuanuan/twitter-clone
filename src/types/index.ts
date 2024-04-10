export interface IRegistData {
  [key: string]: string;
}

export interface ILoginData {
  account: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  account: string;
  introduce: string;
  username: string;
  avatarURL: any;
  coverURL: any;
  post_count: string;
  following_count: number;
  follower_count: number;
}

export interface ITweet_User {
  id: number;
  content: string;
  userID: number;
  createAt: string;
  username: string;
  account: string;
  avatarURL: string;
}
