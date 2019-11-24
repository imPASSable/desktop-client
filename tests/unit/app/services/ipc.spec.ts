jest.mock("electron", () => ({
  __esModule: true,
  ipcRenderer: {
    invoke: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    removeListener: jest.fn()
  }
}));
afterAll(jest.resetAllMocks);

import { ipcRenderer } from "electron";

import { IpcCall, IpcEvent } from "~common/ipc";
import { ipcInvoke, ipcOn, ipcOnce, ipcRemoveListener } from "~/services/ipc";

interface TestPayload {
  message: string;
}

const testCall: IpcCall<TestPayload, TestPayload> = { name: "test.call" };
const testEvent: IpcEvent<TestPayload> = { name: "test.event" };

describe("Renderer electron process IPC interface", () => {
  const prev = ipcRenderer;

  beforeAll(() => {
    window.ipc = ipcRenderer;
  });

  beforeEach(() => {
    (ipcRenderer.invoke as jest.Mock).mockReset();
    (ipcRenderer.on as jest.Mock).mockReset();
    (ipcRenderer.once as jest.Mock).mockReset();
    (ipcRenderer.removeListener as jest.Mock).mockReset();
  });

  afterAll(() => {
    if (typeof prev === "undefined") {
      delete window.ipc;
    } else {
      window.ipc = prev;
    }
  });

  describe("ipcInvoke", () => {
    it("invokes IPC call", async () => {
      (ipcRenderer.invoke as jest.Mock).mockImplementation(() => Promise.resolve({ message: "Hello back" }));

      const payload: TestPayload = { message: "Hi there" };
      const response = await ipcInvoke(testCall, payload);

      expect(response.message).toBe("Hello back");
      expect(ipcRenderer.invoke).toHaveBeenCalledWith(testCall.name, payload);
    });
  });

  describe("ipcOn", () => {
    it("registers the listener with IPC event", () => {
      const fn = jest.fn();
      const listener = ipcOn(testEvent, fn);
      expect(ipcRenderer.on).toHaveBeenCalledWith(testEvent.name, listener);
      const event: TestPayload = { message: "Hi there" };
      listener(undefined, event);
      expect(fn).toHaveBeenCalledWith(event);
    });
  });

  describe("ipcOnce", () => {
    it("registers the single use listener with IPC event", () => {
      const fn = jest.fn();
      const listener = ipcOnce(testEvent, fn);
      expect(ipcRenderer.once).toHaveBeenCalledWith(testEvent.name, listener);
      const event: TestPayload = { message: "Hi there" };
      listener(undefined, event);
      expect(fn).toHaveBeenCalledWith(event);
    });
  });

  describe("ipcRemoveListener", () => {
    it("unregisters the listener with IPC event", () => {
      const listener = ipcOn(testEvent, jest.fn());
      expect(ipcRenderer.on).toHaveBeenCalledWith(testEvent.name, listener);
      ipcRemoveListener(testEvent, listener);
      expect(ipcRenderer.removeListener).toHaveBeenCalledWith(testEvent.name, listener);
    });
  });
});
