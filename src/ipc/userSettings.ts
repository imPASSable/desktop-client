import { IpcCall } from "@/ipc/index";
import { UserSettings } from "@/model/UserSettings";

export const LoadUserSettingsCall: IpcCall<void, Object> = {
  name: "userSettings.load"
};

export const StoreUserSettingsCall: IpcCall<UserSettings, void> = {
  name: "userSettings.store"
};
