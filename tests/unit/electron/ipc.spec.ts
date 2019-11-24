jest.mock("electron", () => ({
  __esModule: true,
  ipcMain: {
    handle: jest.fn(),
    removeHandler: jest.fn()
  }
}));
const ipcHandleMock = ipcMain.handle as jest.Mock;
beforeEach(() => {
  ipcHandleMock.mockReset();
});
afterAll(jest.resetAllMocks);

import { ipcMain, WebContents } from "electron";

import { IpcCall, IpcEvent } from "~common/ipc";
import { ipcDispatch, ipcHandle, ipcRemoveHandler } from "~electron/ipc";

interface TestPayload {
  message: string;
}

const testCall: IpcCall<TestPayload, TestPayload> = { name: "test.call" };
const testEvent: IpcEvent<TestPayload> = { name: "test.event" };

describe("Main electron process IPC interface", () => {
  describe("ipcHandle", () => {
    it("registers the handler method with the IPC call", () => {
      const fn = jest.fn();
      ipcHandle(testCall, fn);
      expect(ipcMain.handle).toHaveBeenCalled();
      expect(ipcHandleMock.mock.calls[0][0]).toBe(testCall.name);
      const event = new Event("test_event");
      const payload: TestPayload = { message: "test message" };
      ipcHandleMock.mock.calls[0][1](event, payload);
      expect(fn).toHaveBeenCalledWith(payload, event);
    });
  });

  describe("ipcRemoveHandler", () => {
    it("unregisters the handler method with the IPC call", () => {
      ipcRemoveHandler(testCall);
      expect(ipcMain.removeHandler).toHaveBeenCalledWith(testCall.name);
    });
  });

  describe("ipcDispatch", () => {
    it("dispatches IPC event", () => {
      const webContents = ({
        send: jest.fn()
      } as unknown) as WebContents;
      const event: TestPayload = { message: "test message" };
      ipcDispatch(webContents, testEvent, event);
      expect(webContents.send).toHaveBeenCalledWith(testEvent.name, event);
    });
  });
});
