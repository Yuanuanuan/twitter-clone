import { createApp } from "vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useUserStore } from "./store";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./components/NotFound.vue"),
  },
  {
    path: "/home",
    component: () => import("./components/pages/HomePage.vue"),
    meta: { requiresAuth: false },
    children: [
      {
        path: "/setting",
        component: () => import("./components/pages/SettingPage.vue"),
      },
      {
        path: "",
        component: () => import("./components/MainWrapper.vue"),
        children: [
          {
            path: "",
            component: () => import("./components/main/Home.vue"),
          },
          {
            path: "/tweet-post",
            component: () => import("./components/main/TweetPost.vue"),
          },
          {
            path: "/profile",
            component: () => import("./components/pages/ProfilePage.vue"),
            children: [
              {
                path: "",
                component: () =>
                  import("./components/profile/ProfileTweet.vue"),
              },
              {
                path: "/profile/tweet-reply",
                component: () =>
                  import("./components/profile/ProfileReply.vue"),
              },
              {
                path: "/profile/liked",
                component: () =>
                  import("./components/profile/ProfileLiked.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/regist",
    component: () => import("./components/pages/RegistPage.vue"),
  },
  {
    path: "/login",
    component: () => import("./components/pages/LoginPage.vue"),
  },
  {
    path: "/admin/login",
    component: () => import("./components/pages/BackLoginPage.vue"),
  },
  {
    path: "/admin",
    component: () => import("./components/BackMainWrapper.vue"),
    meta: { requiresBackAuth: true },
    children: [
      {
        path: "",
        component: () => import("./components/backStage/BackTweetPage.vue"),
      },
      {
        path: "/admin/user",
        component: () => import("./components/backStage/BackUserPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("token");
  const backToken = localStorage.getItem("backToken");
  if (to.meta.requiresBackAuth && !backToken) {
    next("/admin/login");
  } else if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

async function initialUserInfo() {
  await useUserStore().refreshUserInfo();
  app.mount("#app");
}

initialUserInfo();
