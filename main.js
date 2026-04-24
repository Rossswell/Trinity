const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.addAuthHeader('token TU_GITHUB_TOKEN');

const PORT = 37842;

http.createServer((_req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(500); res.end('Error'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}).listen(PORT);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update-message', 'Buscando actualizaciones...');
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-message', '¡Actualización disponible! Descargando...');
  });

  autoUpdater.on('update-not-available', () => {
    mainWindow.webContents.send('update-message', 'La aplicación está actualizada.');
  });

  autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('update-message', 'Error en la actualización: ' + err.message);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow.webContents.send('update-progress', progressObj.percent);
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded', 'Actualización descargada. Se instalará al reiniciar.');
  });
}

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
