jest.mock("electron", () => ({
  __esModule: true,
  ipcRenderer: {
    invoke: jest.fn(() => Promise.resolve({ message: "Hello back" }))
  }
}));
afterAll(jest.resetAllMocks);

import { ipcRenderer } from "electron";

import { IpcCall } from "~common/ipc";
import { ipcInvoke } from "~/services/ipc";

interface TestPayload {
  message: string;
}

const testCall: IpcCall<TestPayload, TestPayload> = { name: "test.call" };

describe("Renderer electron process IPC interface", () => {
  const prev = ipcRenderer;

  beforeAll(() => {
    window.ipc = ipcRenderer;
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
      const payload: TestPayload = { message: "Hi there" };
      const response = await ipcInvoke(testCall, payload);

      expect(response.message).toBe("Hello back");
      expect(ipcRenderer.invoke).toHaveBeenCalledWith(testCall.name, payload);
    });
  });
});
