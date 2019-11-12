import Vue from "vue";
import VueRouter from "vue-router";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import CreateDatabase from "@/views/database/CreateDatabase.vue";
import ViewDatabase from "@/views/database/ViewDatabase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: () => ({ name: "home" })
  },
  {
    path: "/home",
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
  },
  {
    path: "/database/create",
    name: "database.create",
    component: CreateDatabase
  },
  {
    path: "/database/:name",
    name: "database.view",
    component: ViewDatabase
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
