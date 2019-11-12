import { ipcMain, IpcMainInvokeEvent } from "electron";
import { IpcCall } from "@/ipc";

export interface IpcCallHandler<P, R> {
  (event: IpcMainInvokeEvent, payload: P): Promise<R> | R;
}

export const ipcHandle: <P, R>(call: IpcCall<P, R>, handler: IpcCallHandler<P, R>) => void = (call, handler) => {
  ipcMain.handle(call.name, handler);
};
