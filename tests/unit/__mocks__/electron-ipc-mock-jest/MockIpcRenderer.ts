import { IpcRenderer, IpcRendererEvent } from "electron";
import { EventEmitter } from "events";

import MockIpcBridge from "./MockIpcBridge";

export default class MockIpcRenderer extends EventEmitter implements IpcRenderer {
  private readonly bridge: MockIpcBridge;

  constructor(bridge: MockIpcBridge) {
    super();
    this.bridge = bridge;
  }

  _receive(channel: string, ...args: any[]) {
    const event: IpcRendererEvent = {
      ...new Event(channel),
      sender: this,
      senderId: 0
    };
    this.emit(channel, event, ...args);
  }

  invoke(channel: string, ...args: any[]): Promise<any> {
    return this.bridge!.invoke(channel, ...args);
  }

  send(channel: string, ...args: any[]): void {
    this.bridge!.sendToMain(channel, ...args);
  }

  sendSync(channel: string, ...args: any[]): any {
    return this.bridge!.sendToMainSync(channel, ...args);
  }

  sendTo(webContentsId: number, channel: string, ...args: any[]): void {
    this.bridge!.sendToRenderer(channel, ...args);
  }

  sendToHost(channel: string, ...args: any[]): void {
    throw new Error("not implemented");
  }
}
