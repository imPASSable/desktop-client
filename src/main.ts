import Vue from "vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

store.dispatch("userSettings/load").then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});
