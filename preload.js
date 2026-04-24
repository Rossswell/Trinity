const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    onUpdateMessage: (callback) => ipcRenderer.on('update-message', (event, message) => callback(message)),
    onUpdateProgress: (callback) => ipcRenderer.on('update-progress', (event, percent) => callback(percent)),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (event, message) => callback(message))
});
