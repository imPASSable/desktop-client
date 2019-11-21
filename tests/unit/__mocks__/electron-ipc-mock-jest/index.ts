import MockIpcBridge from "./MockIpcBridge";

export function mockElectronIpcFactory(): object {
  const electron = jest.requireActual("electron");
  const include: object = typeof electron === "object" ? electron : { default: electron };
  const bridge = new MockIpcBridge();
  return {
    __esModule: true,
    ...include,
    ipcMain: bridge.main,
    ipcRenderer: bridge.renderer
  };
}
