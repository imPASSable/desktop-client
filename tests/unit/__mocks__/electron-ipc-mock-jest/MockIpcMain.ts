import { IpcMain, IpcMainEvent, IpcMainInvokeEvent, WebContents } from "electron";
import { EventEmitter } from "events";

import MockIpcBridge from "./MockIpcBridge";

type InvocationHandler = (event: IpcMainInvokeEvent, ...args: any[]) => Promise<void> | any;

interface Handler {
  handler: InvocationHandler;
  once: boolean;
}

export default class MockIpcMain extends EventEmitter implements IpcMain {
  private readonly bridge: MockIpcBridge;
  private readonly sender: WebContents;
  private readonly handlers = new Map<string, Handler>();

  constructor(bridge: MockIpcBridge) {
    super();
    this.bridge = bridge;
    this.sender = {
      send: (channel: string, ...args: any[]): void => {
        this.bridge.sendToRenderer(channel, ...args);
      }
    } as WebContents;
  }

  _invoke(channel: string, ...args: string[]): Promise<any> {
    const handler = this.handlers.get(channel);
    if (typeof handler === "undefined") {
      return Promise.reject(`No handler for channel '${channel}'`);
    }

    const event: IpcMainInvokeEvent = {
      ...new Event(channel),
      frameId: 0,
      sender: this.sender
    };

    const result = handler.handler(event, ...args);
    const promise = result instanceof Promise ? result : Promise.resolve(result);

    return promise.finally(this.removeHandlerAfterHandleOnce(channel, handler));
  }

  _receive(channel: string, ...args: any[]): any {
    const event: IpcMainEvent = {
      ...new Event(channel),
      sender: this.sender,
      frameId: 0,
      reply: this.bridge.sendToRenderer,
      returnValue: undefined
    };
    this.emit(channel, event, ...args);
    return event.returnValue;
  }

  private removeHandlerAfterHandleOnce(channel: string, invoked: Handler): () => void {
    return () => {
      const current = this.handlers.get(channel);
      if (current && current.once && current.handler === invoked.handler) {
        this.removeHandler(channel);
      }
    };
  }

  handle(channel: string, listener: InvocationHandler): void {
    this.handlers.set(channel, { handler: listener, once: false });
  }

  handleOnce(channel: string, listener: InvocationHandler): void {
    this.handlers.set(channel, { handler: listener, once: true });
  }

  removeHandler(channel: string): void {
    this.handlers.delete(channel);
  }
}
