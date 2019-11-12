import { ipcRenderer } from "electron";
import { IpcCall } from "@/ipc";

export const ipcInvoke: <P, R>(call: IpcCall<P, R>, payload: P) => Promise<R> = (call, payload) => {
  return ipcRenderer.invoke(call.name, payload);
};
