import { app, BrowserWindow, dialog } from "electron";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

import { CreateDatabaseCall } from "~common/ipc/database";
import { LoadUserSettingsCall, StoreUserSettingsCall } from "~common/ipc/userSettings";

import { ipcHandle } from "~electron/ipc";

ipcHandle(CreateDatabaseCall, async (event, payload) => {
  const dir = payload.path || os.homedir();
  const name = payload.name || "database";
  const window = BrowserWindow.fromWebContents(event.sender);

  return await dialog.showSaveDialog(window, {
    title: "Create database",
    defaultPath: path.resolve(dir, name + ".ipdb"),
    filters: [{ name: "imPASSable Database", extensions: ["ipdb"] }]
  });
});

ipcHandle(LoadUserSettingsCall, async () => {
  const file = path.resolve(app.getPath("userData"), "settings.json");
  const exists = await fs
    .access(file)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false));
  if (!exists) {
    return {};
  }
  const content = await fs.readFile(file, { encoding: "utf-8" });
  return JSON.parse(content);
});

ipcHandle(StoreUserSettingsCall, async (event, userSettings) => {
  const file = path.resolve(app.getPath("userData"), "settings.json");
  await fs.writeFile(file, JSON.stringify(userSettings));
});
