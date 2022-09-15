import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from "vue-router";
import PlayerView from "../views/PlayerView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "player",
      meta: {
        title: "QLYPlayer",
      },
      component: PlayerView,
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((from, to, next) => {
  if (to.meta.title) {
    document.title = <string>to.meta.title;
  }
  next();
});

export default router;
