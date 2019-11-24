import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { DatabaseStoreModule } from "~/store/database";
import { UserSettingsStoreModule } from "~/store/userSettings";

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== "production",
  modules: {
    database: DatabaseStoreModule,
    userSettings: UserSettingsStoreModule
  }
};

export default new Vuex.Store<RootState>(store);
