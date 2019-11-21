import MockIpcRenderer from "./MockIpcRenderer";
import MockIpcMain from "./MockIpcMain";

function jsonSanitize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export default class MockIpcBridge {
  readonly main: MockIpcMain;
  readonly renderer: MockIpcRenderer;

  constructor() {
    this.main = new MockIpcMain(this);
    this.renderer = new MockIpcRenderer(this);
  }

  invoke(channel: string, ...args: string[]): Promise<any> {
    return this.main._invoke(channel, ...jsonSanitize(args)).then(jsonSanitize);
  }

  sendToMain(channel: string, ...args: any[]): void {
    this.main._receive(channel, ...jsonSanitize(args));
  }

  sendToMainSync(channel: string, ...args: any[]): any {
    return this.main._receive(channel, ...jsonSanitize(args)).returnValue;
  }

  sendToRenderer(channel: string, ...args: any[]): void {
    this.renderer._receive(channel, ...jsonSanitize(args));
  }
}
