export interface EmptyPayload {}

export interface IpcCall<P = EmptyPayload, R = void> {
  name: string;
}
