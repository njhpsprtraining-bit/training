const { contextBridge } = require('electron');

// Expose minimal API to renderer - keeps app secure
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  isElectron: true
});
