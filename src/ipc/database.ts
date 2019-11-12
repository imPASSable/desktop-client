import { IpcCall } from "@/ipc/index";

export interface CreateDatabasePayload {
  name?: string;
  path?: string;
}

export interface CreateDatabaseResponse {
  canceled: boolean;
  filePath?: string;
}

export const CreateDatabaseCall: IpcCall<CreateDatabasePayload, CreateDatabaseResponse> = {
  name: "database.create"
};
