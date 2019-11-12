import { CreateDatabaseCall } from "@/ipc/database";
import { ipcInvoke } from "@/ipc/renderer";

export interface DatabaseService {
  create(name: string | undefined, path: string | undefined): Promise<string>;
}

export const databaseService: DatabaseService = {
  async create(name, path): Promise<string> {
    const value = await ipcInvoke(CreateDatabaseCall, { name, path });
    return value.canceled || !value.filePath ? await Promise.reject("Canceled") : value.filePath;
  }
};
