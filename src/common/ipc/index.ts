export interface IpcCall<P = void, R = void> {
  name: string;
}

export interface IpcEvent<E = void> {
  name: string;
}
