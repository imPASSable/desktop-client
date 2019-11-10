import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { UserSettingsStoreModule } from "@/store/userSettings";

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    userSettings: UserSettingsStoreModule
  }
};

export default new Vuex.Store<RootState>(store);
