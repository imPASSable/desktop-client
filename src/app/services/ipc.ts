import { IpcCall, IpcEvent } from "~common/ipc";

export const ipcInvoke: <P, R>(call: IpcCall<P, R>, payload: P) => Promise<R> = (call, payload) => {
  return window.ipc.invoke(call.name, payload);
};

export type IpcInternalEventListener<E> = (_: any, event: E) => void;

export function ipcOn<E>(eventType: IpcEvent<E>, listener: (event: E) => void): IpcInternalEventListener<E> {
  const fn: IpcInternalEventListener<E> = (_, event) => listener(event);
  window.ipc.on(eventType.name, fn);
  return fn;
}

export function ipcOnce<E>(eventType: IpcEvent<E>, listener: (event: E) => void): IpcInternalEventListener<E> {
  const fn: IpcInternalEventListener<E> = (_, event) => listener(event);
  window.ipc.once(eventType.name, fn);
  return fn;
}

export function ipcRemoveListener<E>(eventType: IpcEvent<E>, listener: IpcInternalEventListener<E>): void {
  window.ipc.removeListener(eventType.name, listener);
}
