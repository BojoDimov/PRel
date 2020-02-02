const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const pm = require('../lib/build/main');
let win;

enum CommunicationChannel {
  startAll = "start-all",
  addService = "add-service",
  openLogs = "open-logs",
  serviceStopAllNodes = "service-stop-all-nodes",
  serviceStartNewNode = "service-start-new-node",
  serviceStartNode = "service-start-node",
  serviceStopNode = "service-stop-node"
}

function formatData(services: any) {
  let result = [];
  Object.keys(services).forEach(key => {
    result.push(services[key]);
  });
  return result;
}

function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 800, webPreferences: { nodeIntegration: true } });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("data", formatData(pm.services));
    setInterval(() => win.webContents.send("data", formatData(pm.services)), 5 * 1000);
  });

  ipcMain.on(CommunicationChannel.startAll, (data) => console.log("Caught event", CommunicationChannel.startAll, data));

  ipcMain.on(CommunicationChannel.addService, (data) => console.log("Caught event", CommunicationChannel.addService, data));

  ipcMain.on(CommunicationChannel.openLogs, (data) => console.log("Caught event", CommunicationChannel.openLogs, data));

  // The following is optional and will open the DevTools:
  win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});