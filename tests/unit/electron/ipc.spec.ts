jest.mock("electron", () => ({
  __esModule: true,
  ipcMain: {
    handle: jest.fn(),
    removeHandler: jest.fn()
  }
}));
afterAll(jest.resetAllMocks);

import { ipcMain } from "electron";

import { IpcCall } from "~common/ipc";
import { ipcHandle, ipcRemoveHandler } from "~electron/ipc";

interface TestPayload {
  message: string;
}

const testCall: IpcCall<TestPayload, TestPayload> = { name: "test.call" };

describe("Main electron process IPC interface - ", () => {
  describe("ipcHandle", () => {
    it("registers the handler method with the IPC call", () => {
      const fn = jest.fn();
      ipcHandle(testCall, fn);
      expect(ipcMain.handle).toHaveBeenCalledWith(testCall.name, fn);
    });
  });

  describe("ipcRemoveHandler", () => {
    it("unregisters the handler method with the IPC call", () => {
      ipcRemoveHandler(testCall);
      expect(ipcMain.removeHandler).toHaveBeenCalledWith(testCall.name);
    });
  });
});
