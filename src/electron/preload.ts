import { ipcRenderer, IpcRenderer } from "electron";
// @ts-ignore
import sourceMapSupport from "source-map-support";

declare global {
  interface Window {
    ipc: IpcRenderer;
    sourceMapSupport: any;
    appPath?: string;
  }
}

window.ipc = ipcRenderer;
window.sourceMapSupport = sourceMapSupport;

process.once("loaded", () => {
  window.appPath = ipcRenderer.sendSync("getAppPath");
});
