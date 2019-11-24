import { ipcMain, IpcMainInvokeEvent, WebContents } from "electron";

import { IpcCall, IpcEvent } from "~common/ipc";

export function ipcHandle<P, R>(
  call: IpcCall<P, R>,
  handler: (payload: P, event: IpcMainInvokeEvent) => Promise<R> | R
): void {
  ipcMain.handle(call.name, (event, payload) => handler(payload, event));
}

export function ipcRemoveHandler<P, R>(call: IpcCall<P, R>): void {
  ipcMain.removeHandler(call.name);
}

export function ipcDispatch<E>(webContents: WebContents, eventType: IpcEvent<E>, event: E) {
  webContents.send(eventType.name, event);
}
