import { Server } from "vue-cli-plugin-electron-builder";
import { serverProvider, restartApp, stopServer } from "./util";
jest.setTimeout(50000);

describe("Application launch", () => {
  let server: Server;

  beforeAll(async done => {
    server = await serverProvider();
    done();
  });

  beforeEach(async () => await restartApp(server));

  afterAll(async () => await stopServer(server));

  test("Window Loads Properly", async () => {
    const win = server.app.browserWindow;
    const client = server.app.client;

    // Window was created
    expect(await client.getWindowCount()).toBe(1);
    // It is not minimized
    expect(await win.isMinimized()).toBe(false);
    // Window is visible
    expect(await win.isVisible()).toBe(true);
    // Size is correct
    const { width, height } = await win.getBounds();
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    // App is loaded properly
    expect(await win.getTitle()).toBe("imPASSable");
  });
});
