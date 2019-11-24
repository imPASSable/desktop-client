import { BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from "electron";

import { MenuActionEvent } from "~common/ipc/events";

import { ipcDispatch } from "~electron/ipc";

function dispatchMenuEvent(menuItem: MenuItem, browserWindow: BrowserWindow) {
  ipcDispatch(browserWindow.webContents, MenuActionEvent, menuItem.id);
}

const template: Array<MenuItemConstructorOptions> = [
  {
    id: "database",
    label: "Database",
    submenu: [
      {
        id: "database.new",
        label: "New database",
        click: dispatchMenuEvent
      },
      {
        id: "database.open",
        label: "Open database",
        accelerator: "CmdOrCtrl+O",
        click: dispatchMenuEvent
      },
      { type: "separator" },
      {
        id: "database.save",
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click: dispatchMenuEvent
      },
      { type: "separator" },
      {
        id: "preferences",
        label: "Preferences",
        click: dispatchMenuEvent
      },
      { type: "separator" },
      {
        id: "quit",
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        role: "quit"
      }
    ]
  },
  {
    id: "help",
    label: "Help",
    submenu: [
      {
        id: "help.about",
        label: "About",
        click: dispatchMenuEvent
      }
    ]
  }
];

export function createMenu(): Menu {
  return Menu.buildFromTemplate(template);
}
