import { ipcMain, IpcMainInvokeEvent } from "electron";

import { IpcCall } from "~common/ipc";

export interface IpcCallHandler<P, R> {
  (event: IpcMainInvokeEvent, payload: P): Promise<R> | R;
}

export function ipcHandle<P, R>(call: IpcCall<P, R>, handler: IpcCallHandler<P, R>): void {
  ipcMain.handle(call.name, handler);
}

export function ipcRemoveHandler<P>(call: IpcCall<P, any>): void {
  ipcMain.removeHandler(call.name);
}
