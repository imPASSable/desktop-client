const uuid = require("uuid/v4");

import { CreateDatabaseCall, LoadDatabaseCall, StoreDatabaseCall } from "~common/ipc/database";
import { Database, GroupSecret } from "~common/model/Database";
import { DatabaseReference } from "~common/model/DatabaseReference";

import { ipcInvoke } from "~/services/ipc";

export interface DatabaseService {
  create(name: string | undefined, path: string | undefined): Promise<string>;
  load(ref: DatabaseReference): Promise<Database>;
  save(ref: DatabaseReference, db: Database): Promise<void>;
  createEmpty(): Database;
}

export const databaseService: DatabaseService = {
  async create(name, path): Promise<string> {
    const value = await ipcInvoke(CreateDatabaseCall, { name, path });
    return value.canceled || !value.filePath ? await Promise.reject("Canceled") : value.filePath;
  },

  load(ref: DatabaseReference): Promise<Database> {
    return ipcInvoke(LoadDatabaseCall, ref);
  },

  save(ref: DatabaseReference, db: Database): Promise<void> {
    return ipcInvoke(StoreDatabaseCall, { ref, db });
  },

  createEmpty(): Database {
    const root: GroupSecret = {
      id: uuid(),
      name: "root",
      members: []
    };
    return {
      root: root.id,
      secrets: [root]
    };
  }
};
