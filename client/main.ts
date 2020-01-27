const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const pm = require('../lib/build/main');
let win;

function pollProcessManager() {
  console.log(pm.services);
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
    win.webContents.send("data", pm.services);
    setInterval(() => win.webContents.send("data", pm.services), 5 * 1000);
  });

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

setInterval(pollProcessManager, 5 * 1000);