import { Server, testWithSpectron } from "vue-cli-plugin-electron-builder";

interface ServerProvider {
  (): Promise<Server>;
}

// @ts-ignore
export const serverProvider: ServerProvider = () => testWithSpectron({ noStart: true });

export const restartApp: (server: Server) => Promise<void> = async server => {
  if (server.app.isRunning()) {
    await server.app.stop();
  }
  await server.app.start();
  await server.app.client.waitUntilWindowLoaded();
};

export const stopServer: (server: Server) => Promise<void> = async server => {
  // workaround for https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/543
  if (!server.app.isRunning()) {
    await server.app.start();
  }
  await server.stopServe();
};
