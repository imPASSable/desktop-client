import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store";

export interface UserSettingsState {
  darkMode: boolean;
}

const state: UserSettingsState = {
  darkMode: false
};

const getters: GetterTree<UserSettingsState, RootState> = {
  darkMode(state): boolean {
    return state.darkMode;
  }
};

const mutations: MutationTree<UserSettingsState> = {
  setDarkMode(state, darkMode: boolean) {
    state.darkMode = darkMode;
  }
};

const actions: ActionTree<UserSettingsState, RootState> = {
  setDarkMode({ commit }, darkMode: boolean): void {
    commit("setDarkMode", darkMode);
  }
};

export const UserSettingsStoreModule: Module<UserSettingsState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
