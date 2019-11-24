import { IpcEvent } from "~common/ipc/index";

export const MenuActionEvent: IpcEvent<string> = {
  name: "menu.action"
};
