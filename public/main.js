const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')
const { autoUpdater } = require('electron-updater');
var fs = require('fs');

app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null


////////  SINGLE INSTANCE
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
    createWindow()
  })
}
/////////////////////////////////////


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);
  //win.maximize()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

  checkYo()
  setInterval(checkYo, 60000)
}


function checkYo() {
  autoUpdater.checkForUpdatesAndNotify();
}

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('MOUNTED', () => {
  console.log('Got The Message')
});



autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

autoUpdater.on('error', () => {
  win.webContents.send('update_error');
});




///////////////////// FILE OPEN AND SAVE //////////////////////////////
ipcMain.on('OPEN', (event, arg) => {
  console.log(arg) // prints "ping"
  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Config File', extensions: ['wbmtek'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (result.canceled) {
      console.log('CANCLED')
    } else {
      console.log(result.filePaths)
      fs.readFile(result.filePaths[0], function (err, data) {
        console.log(data.toString())
        event.reply('asynchronous-reply', data.toString())
      });
    }
  }).catch(err => {
    console.log(err)
  })
})

ipcMain.on('SAVE', (event, arg, fileData) => {
  console.log(arg) // prints "ping"
  dialog.showSaveDialog(win, {
    properties: ['createDirectory', 'showOverwriteConfirmation'],
    filters: [{ name: 'Config File', extensions: ['wbmtek'] },]
  }).then(result => {
    if (result.canceled) {
      console.log('CANCLED')
    } else {
      console.log(result.filePath)
      fs.writeFile(result.filePath, fileData, function (err) {
        if (err) throw err;
        console.log('Saved!');
        event.reply('itSaved', 'yup')
      });
    }
  }).catch(err => {
    console.log(err)
  })
})
///////////////////////////////////////////////////////////////////////