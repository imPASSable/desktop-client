import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { Database } from "~common/model/Database";
import { DatabaseReference } from "~common/model/DatabaseReference";

import { RootState } from "~/store";
import { databaseService } from "~/services/DatabaseService";

interface DatabaseRecord {
  db: Database;
  changed: boolean;
}

interface DatabaseStoreState {
  databases: Record<string, DatabaseRecord>;
}

const state: DatabaseStoreState = {
  databases: {}
};

const getters: GetterTree<DatabaseStoreState, RootState> = {
  openDatabaseNames(state): string[] {
    return Object.keys(state.databases);
  },
  getDatabase(state): (name: string) => Database | undefined {
    return name => (name in state.databases ? state.databases[name].db : undefined);
  }
};

const mutations: MutationTree<DatabaseStoreState> = {
  SET_DATABASE(state, { name, db }): void {
    state.databases[name] = { db, changed: false };
  }
};

const actions: ActionTree<DatabaseStoreState, RootState> = {
  openDatabase({ commit, state }, dbRef: DatabaseReference): Promise<void> {
    return databaseService.load(dbRef).then(db => commit("SET_DATABASE", { name: dbRef.name, db }));
  }
};

export const DatabaseStoreModule: Module<DatabaseStoreState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
