import { app, BrowserWindow, dialog } from "electron";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

import { CreateDatabaseCall, LoadDatabaseCall, StoreDatabaseCall } from "~common/ipc/database";
import { LoadUserSettingsCall, StoreUserSettingsCall } from "~common/ipc/userSettings";

import { ipcHandle } from "~electron/ipc";
import { Database } from "~common/model/Database";
import { UserSettings } from "~common/model/UserSettings";

const ENCODING = "utf-8";

ipcHandle(CreateDatabaseCall, async (payload, event) => {
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
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    return { darkMode: false, databases: [] };
  }
  const content = await fs.readFile(file, { encoding: ENCODING });
  return JSON.parse(content) as UserSettings;
});

ipcHandle(StoreUserSettingsCall, async userSettings => {
  const file = path.resolve(app.getPath("userData"), "settings.json");
  await fs.writeFile(file, JSON.stringify(userSettings), { encoding: ENCODING });
});

ipcHandle(LoadDatabaseCall, async ref => {
  const content = await fs.readFile(ref.path, { encoding: ENCODING });
  return JSON.parse(content) as Database;
});

ipcHandle(StoreDatabaseCall, async payload => {
  await fs.writeFile(payload.ref.path, JSON.stringify(payload.db), { encoding: ENCODING });
});
