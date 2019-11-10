import Vue from "vue";
import VueRouter from "vue-router";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
