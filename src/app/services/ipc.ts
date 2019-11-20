import { IpcCall } from "~common/ipc";

export const ipcInvoke: <P, R>(call: IpcCall<P, R>, payload: P) => Promise<R> = (call, payload) => {
  return window.ipc.invoke(call.name, payload);
};
