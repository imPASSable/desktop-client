import Vue from "vue";
import VueRouter from "vue-router";

import About from "~/views/About.vue";
import CreateDatabase from "~/views/database/CreateDatabase.vue";
import DatabaseSettings from "~/views/database/DatabaseSettings.vue";
import ViewDatabase from "~/views/database/ViewDatabase.vue";
import Home from "~/views/Home.vue";
import Settings from "~/views/Settings.vue";

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
  },
  {
    path: "/database/:name/settings",
    name: "database.settings",
    component: DatabaseSettings
  }
];

const router = new VueRouter({
  mode: "hash",
  base: window.appPath,
  routes
});

export default router;
