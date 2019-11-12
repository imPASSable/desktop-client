import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store";
import { UserSettings } from "@/model/UserSettings";
import { DatabaseReference } from "@/model/DatabaseReference";
import { ipcInvoke } from "@/ipc/renderer";
import { LoadUserSettingsCall, StoreUserSettingsCall } from "@/ipc/userSettings";

const defaultUserSettings = {
  darkMode: false,
  lastPath: undefined,
  databases: []
};

const getters: GetterTree<UserSettings, RootState> = {
  darkMode(state): boolean {
    return state.darkMode;
  },
  lastPath(state): string | undefined {
    return state.lastPath;
  },
  databases(state): DatabaseReference[] {
    return state.databases;
  }
};

const mutations: MutationTree<UserSettings> = {
  SET_DARK_MODE(state, darkMode: boolean) {
    state.darkMode = darkMode;
    ipcInvoke(StoreUserSettingsCall, state);
  },
  SET_LAST_PATH(state, lastPath: string | undefined) {
    state.lastPath = lastPath;
    ipcInvoke(StoreUserSettingsCall, state);
  },
  ADD_DATABASE(state, dbRef: DatabaseReference) {
    state.databases.push(dbRef);
    ipcInvoke(StoreUserSettingsCall, state);
  },
  SET_USER_SETTINGS(state, userSettings: Object) {
    Object.assign(state, userSettings);
  }
};

const actions: ActionTree<UserSettings, RootState> = {
  setDarkMode({ commit }, darkMode: boolean): void {
    commit("SET_DARK_MODE", darkMode);
  },
  setLastPath({ commit }, lastPath: string | undefined) {
    commit("SET_LAST_PATH", lastPath);
  },
  addDatabase({ commit, state }, dbRef: DatabaseReference): Promise<void> {
    return new Promise((resolve, reject) => {
      const conflictingDb: DatabaseReference | undefined = state.databases.find(db => db.name === dbRef.name);
      if (typeof conflictingDb !== "undefined") {
        reject(`Database with name '${dbRef.name}' is already registered`);
      }

      commit("ADD_DATABASE", dbRef);
      resolve();
    });
  },
  load({ commit }): Promise<void> {
    return ipcInvoke(LoadUserSettingsCall, undefined).then(userSettings => {
      commit("SET_USER_SETTINGS", userSettings);
    });
  }
};

export const UserSettingsStoreModule: Module<UserSettings, RootState> = {
  namespaced: true,
  state: () => ({ ...defaultUserSettings }),
  getters,
  actions,
  mutations
};
