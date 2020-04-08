const {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} = require('electron')
const os = require('os');
const SerialPort = require('serialport')
var usbDetect = require('usb-detection');
const path = require('path')
const url = require('url')
const { autoUpdater } = require('electron-updater');
var fs = require('fs');

const { spawn } = require('child_process');

//WINDOW SCALING BYPASS
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null

////////  SINGLE INSTANCE //////////
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
///////////////////////////////////////


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
    usbDetect.stopMonitoring()
    win = null
  })

  checkYo()
  setInterval(checkYo, 60000)

  usbDetect.startMonitoring();
  usbDetect.on('add', function (device) { win.webContents.send('add', device.serialNumber); });
  usbDetect.on('remove', function (device) { win.webContents.send('remove', device.serialNumber); });
  //usbDetect.find(vid, function(err, devices) { console.log('find', devices, err); });
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
        event.reply('itSaved', 'File Saved')
      });
    }
  }).catch(err => {
    console.log(err)
  })
})
///////////////////////////////////////////////////////////////////////

ipcMain.on('ports', (event, arg, fileData) => {
  console.log('Port Request');
  listPorts(event)
})

ipcMain.on('app-is-up', function () {
  log('App Is Up!')
  getNetInfo()
})

function listPorts(event) {
  SerialPort.list().then(
    ports => {
      ports.forEach(port => {
        //console.log(`${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`)
        event.reply('port', `${port.comName} |\t${port.serialNumber || ''} |\t${port.manufacturer || ''}`)
      })
    },
    err => {
      console.error('Error listing ports', err)
    }
  )
}

function log(msg) {
  win.webContents.send('mainlog', msg)
}

function getNetInfo() {
  let child
  log('In getNetInfo()')
  if (os.platform() === 'win32') {
    log('Detected Windows')
    //let child = spawn('ipconfig', ['/all']);
    child = spawn('ipconfig');
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      // data from standard output is here as buffers
      log(chunk);
    });
    // since these are streams, you can pipe them elsewhere
    //child.stderr.pipe(dest);
    child.on('close', (code) => {
      log(`child process exited with code ${code}`);
      child = null
    });
  } else if (os.platform() === 'darwin') {
    log('Detected macOSX')
    //let child = spawn('ipconfig', ['/all']);
    child = spawn('ifconfig');
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      // data from standard output is here as buffers
      log(chunk);
    });
    // since these are streams, you can pipe them elsewhere
    //child.stderr.pipe(dest);
    child.on('close', (code) => {
      log(`child process exited with code ${code}`);
      child = null
    });
  }
}