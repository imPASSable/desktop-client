import { IpcCall } from "~common/ipc";

const { ipc } = window;

export const ipcInvoke: <P, R>(call: IpcCall<P, R>, payload: P) => Promise<R> = (call, payload) => {
  return ipc.invoke(call.name, payload);
};
