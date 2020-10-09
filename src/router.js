import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("./views/Main.vue"),
    },
    {
      path: "/pokemon/:name",
      name: "Details",
      component: () => import("./views/Details.vue"),
    },
  ],
});
