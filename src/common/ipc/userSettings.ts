import { IpcCall } from "~common/ipc";
import { UserSettings } from "~common/model/UserSettings";

export const LoadUserSettingsCall: IpcCall<void, Object> = {
  name: "userSettings.load"
};

export const StoreUserSettingsCall: IpcCall<UserSettings, void> = {
  name: "userSettings.store"
};
