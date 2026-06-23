const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'NJHPS Training Management System',
    icon: path.join(__dirname, 'public/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev
    },
    autoHideMenuBar: !isDev
  });

  // Remove menu in production
  if (!isDev) {
    Menu.setApplicationMenu(null);
  }

  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'build/index.html'));
  }

  // Prevent navigation away from app
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.includes('localhost:3000') && !url.includes('index.html')) {
      e.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
