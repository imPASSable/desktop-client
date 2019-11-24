import { IpcCall } from "~common/ipc";
import { Database } from "~common/model/Database";
import { DatabaseReference } from "~common/model/DatabaseReference";

export interface CreateDatabasePayload {
  name?: string;
  path?: string;
}

export interface CreateDatabaseResponse {
  canceled: boolean;
  filePath?: string;
}

export interface StoreDatabasePayload {
  ref: DatabaseReference;
  db: Database;
}

export const CreateDatabaseCall: IpcCall<CreateDatabasePayload, CreateDatabaseResponse> = {
  name: "database.create"
};

export const LoadDatabaseCall: IpcCall<DatabaseReference, Database> = {
  name: "database.load"
};

export const StoreDatabaseCall: IpcCall<StoreDatabasePayload, void> = {
  name: "database.store"
};
