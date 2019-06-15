'use strict';

import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  Menu,
  NativeImage,
} from 'electron';
import path from 'path';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1366,
    // autoHideMenuBar: true,
    // skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

function initTrayIcon() {
  const tray = new Tray(path.join(process.cwd(), 'public/favicon.ico'));
  // const tray = new Tray(path.join(process.cwd(), 'src/assets/icon.png'))
  // const tray = new Tray(path.join(process.resourcesPath, 'public/favicon.ico'))

  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        // win.show()
      },
    },
    {
      label: '退出',
      click: () => {
        win.webContents.send(app.quit, 'quit');
      },
    },
  ]);
  tray.setToolTip('Tools');

  tray.on('click', () => {
    win.show();
  });
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu);
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
    // initTrayIcon()
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
  initTrayIcon();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
