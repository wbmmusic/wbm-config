const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')

const os = require('os');

//Get the OS
const isMac = process.platform === 'darwin'

//Used for firmware update (BOSSAC)
const { execFile } = require('child_process');

//Get Path to bossa
var filePath
if (isMac) {
  filePath = path.join(__dirname, '/bossacmac');
} else {
  filePath ='public/bossac';
}

//Firmware stuff
let pathToFirmware
let firmwareUpload = false
/////////////////////////////////////////////

//SERIAL PORT
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')
var port
///////////////////////////////////////////////

//Auto Updater
const { autoUpdater } = require('electron-updater');

//File System
var fs = require('fs');


//TABLE OF CONNECTED DEVICES
let conDevs = []


var menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'devices' }
  {
    label: 'Devices',
    submenu: [
      {
        label: 'No Connected Devices',
        enabled: false
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'WBM Tek Website',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://wbmtek.com')
        }
      },
      {
        label: 'About',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://marecewilliams.com')
        }
      }
    ]
  }
]
var menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)


//USB Detection ///////////////////////////////////////////////////////////
var usbDetect = require('usb-detection');
usbDetect.on('add:1003', function (device) { checkIfWBMdevice(device) });
usbDetect.on('remove:1003', function (device) { usbDisconnected(device) });
//END USB Detection ///////////////////////////////////////////////////////


let colorPickerWindow
var colorPickerOpen = false
var clPckrCh = 0


//WINDOW SCALING BYPASS
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

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
    //log("-APP IS READY");
    createWindow()

    ipcMain.on('showColorPicker', function (event, ch, nm) {
      log("Color Picker " + ch)

      if (!colorPickerOpen) {
        clPckrCh = ch
        colorPickerWindow = new BrowserWindow(
          {
            width: 180,
            height: 420,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: false,
            titleBarStyle: "customButtonsOnHover",
            webPreferences: {
              nodeIntegration: true
            }
          }
        );

        colorPickerWindow.setMenuBarVisibility(false)

        colorPickerWindow.loadURL(url.format({
          pathname: path.join(__dirname, 'colorPicker.html'),
          protocol: 'file',
          slashes: true
        }));

        colorPickerWindow.webContents.on('did-finish-load', function () {
          colorPickerOpen = true
          colorPickerWindow.send('channel', ch, nm)
        });

        colorPickerWindow.on('closed', function () {
          colorPickerOpen = false
        });
      } else if (ch !== clPckrCh) {
        clPckrCh = ch
        colorPickerWindow.close()

        colorPickerWindow = new BrowserWindow(
          {
            width: 180,
            height: 420,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: false,
            titleBarStyle: "customButtonsOnHover",
            webPreferences: {
              nodeIntegration: true
            }
          }
        );

        colorPickerWindow.loadURL(url.format({
          pathname: path.join(__dirname, 'colorPicker.html'),
          protocol: 'file',
          slashes: true
        }));

        colorPickerWindow.webContents.on('did-finish-load', function () {
          colorPickerOpen = true
          colorPickerWindow.send('channel', ch, nm)
        });

        colorPickerWindow.on('closed', function () {
          colorPickerOpen = false
        });

      } else if (ch === clPckrCh) {
        colorPickerOpen = false
        clPckrCh = 0
        colorPickerWindow.close()
      }

    })

    ipcMain.on('nameChange', (event, chnl, name) => {
      if (colorPickerOpen && chnl === clPckrCh) {
        //log('SEND')
        colorPickerWindow.webContents.send('nameToPicker', name)
      }
    })
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
    if (colorPickerOpen) {
      colorPickerWindow.close()
    }

  })

  checkYo()
  setInterval(checkYo, 60000)
  usbDetect.startMonitoring();

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
  log('Got The Message')
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
  log(arg) // prints "ping"
  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Config File', extensions: ['wbmtek'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (result.canceled) {
      log('CANCLED')
    } else {
      log(result.filePaths)
      fs.readFile(result.filePaths[0], function (err, data) {
        log(data.toString())
        event.reply('asynchronous-reply', data.toString())
      });
    }
  }).catch(err => {
    log(err)
  })
})

ipcMain.on('SAVE', (event, arg, fileData) => {
  log(arg) // prints "ping"
  dialog.showSaveDialog(win, {
    properties: ['createDirectory', 'showOverwriteConfirmation'],
    filters: [{ name: 'Config File', extensions: ['wbmtek'] },]
  }).then(result => {
    if (result.canceled) {
      log('CANCLED')
    } else {
      log(result.filePath)
      fs.writeFile(result.filePath, fileData, function (err) {
        if (err) throw err;
        log('Saved!');
        event.reply('itSaved', 'File Saved')
      });
    }
  }).catch(err => {
    log(err)
  })
})
///////////////////////////////////////////////////////////////////////

ipcMain.on('ports', (event, arg, fileData) => {
  log('Port Request')
  //listPorts(event)
})

ipcMain.on('app-is-up', function () {
  log('App Is Up!')
  log('PATH BELOW to Bossac')
  log(filePath)

  //On boot look for any devices that are already connected
  usbDetect.find(1003, function (err, devices) { findAtmelDevices(devices, err) });
  //getNetInfo()
})



////////////////////////////////////////////////////////////////////////////////
//FROM wbmSerial /////////////////////////////////////////////////////////
//Opens a port and gets device info
function createPort(path, serNum) {

  log('CREATE PORT')

  //The slot (address in conDevs[?]) we will use for this device
  let targetPort
  var numOfConnections = conDevs.length
  //NEED TO RUN THROUGH CON DEVS TO FIND OUT WHAT SLOT IN THE ARRAY TO USE HERE
  for (var i = 0; i <= numOfConnections; i++) {
    //If there are no connected devices use 0
    if (!conDevs[0]) {
      targetPort = 0

      //If all slots are used then use next
    } else if (i === numOfConnections) {
      targetPort = i

      //If this slot is not used then we use it
    } else if (!conDevs[i]) {
      targetPort = i

      //If this slot is used we move on to the next one
    } else {
      //Move on
    }
  }

  //Add a empty element into conDevs
  conDevs.push({
    port: [],
    info: {
      serialNumber: '',
      Model: '',
      UserName: '',
      firmware: 'X.X.X'
    },
    data: []
  })

  //Create the serial port for this device
  conDevs[targetPort].port = new SerialPort(path, { baudRate: 256000 })

  //Add the serial number
  conDevs[targetPort].info.serialNumber = serNum

  //request the devices info
  conDevs[targetPort].port.write('WBM ID REQ')

  //Create this ports read callback
  conDevs[targetPort].port.on('readable', function () {
    log('---->Recieved Data')
    conDevs[targetPort].port.read()
  })

  //Set the callback for recieving data
  conDevs[targetPort].port.on('data', function (data) {
    var packet = data.toString()
    log('PACKET DATA BELOW')
    log(packet)

    ////////////////////////////////////////////////////////////////////////////////////////////
    /*
        Should probably do something here

        Have some sort of message type filtering and call functions based on message type  

        info / data / parameter / etc
    */
    ////////////////////////////////////////////////////////////////////////////////////////////

    //Get the key value pairs from the packet
    const keyValPairs = packet.split('\r\n');
    for (var i = 0; i < keyValPairs.length - 1; i++) {
      var temp = keyValPairs[i]

      //split key value pair into key and value
      var keyAndValue = temp.split(':')
      var key = keyAndValue[0]
      var value = keyAndValue[1]

      if (key === 'Model') {
        conDevs[targetPort].info.Model = value
      } else if (key === 'UserName') {
        conDevs[targetPort].info.UserName = value
      } else if (key === 'Firmware') {
        conDevs[targetPort].info.firmware = value
      } else {
        log("--Not Recognized -> " + key + " = " + value)
      }
    }

    log('Device ' + targetPort + ' Info Info Below v')
    log(conDevs[targetPort].info)
    log('---->END Recieved Data')

    //Update the Devices menu to display new device
    redrawDeviceMenu()
  })
}

function redrawDeviceMenu() {
  log('Redraw Menu')

  //Update Devices menu to represent conDevs
  for (var i = 0; i < menuTemplate.length; i++) {
    if (menuTemplate[i].label == 'Devices') {

      //add the menu item
      try {
        //Clear the devices submenu
        menuTemplate[i].submenu = []

        //If there are no devices add 'No Connected Devices' to submenu
        if (conDevs.length === 0) {
          menuTemplate[i].submenu.push({
            label: 'No Connected Devices',
            enabled: false
          })
          log('No Devices Connected set in menu')

          //If there are connected devices devices (conDevs.lenght > 0)
        } else {
          //Add each device in conDevs to Devices submenu
          for (var y = 0; y < conDevs.length; y++) {
            menuTemplate[i].submenu.push({
              label: conDevs[y].info.Model + ' | ' +
                conDevs[y].info.UserName + ' | ' +
                conDevs[y].info.serialNumber,
              id: conDevs[y].info.serialNumber,
              click: selectDevice
            })
          }
        }

        //Update the menu
        menu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(menu)

      } catch (error) {
        log('->ERROR in add menu item')
      }
    }
  }
}

//If an ATMEL USB device is disconnected
function usbDisconnected(device) {
  //check to see if it was a currently connected device
  for (var i = 0; i < conDevs.length; i++) {

    //if the romoved device is in our list of connected devices
    if (conDevs[i].info.serialNumber === device.serialNumber) {

      //close the serial port associated with this device
      if (isMac) {
        conDevs[i].port.close()
      }

      log('USB DEVICE DISCONNECTED ' + conDevs[i].info.serialNumber)

      //remove it from the connected devices list
      conDevs.splice(i, 1);
      log("# of active connections = " + conDevs.length)

      //Remove it from the devices menu
      redrawDeviceMenu()
    }
  }
}

function findAtmelDevices(devices, err) {
  /*
  Feed each connected ATMEL device to checkIfWBMdevice()

  This is beacuse usbDetect.find could feed us a list of 
  multiple connected ATMEL devices
  */
  for (var i = 0; i < devices.length; i++) {

    checkIfWBMdevice(devices[i])
  }
}

function isThisOurSerialNumber(device) {

  //If this device is ours and in bootlader
  if (device.serialNumber === "WBMBXYZABC") {
    findSerNumInAvailPorts(device.serialNumber)

    //if this device is ours
  } else if (device.serialNumber.substring(0, 4) === "WBM:") {
    findSerNumInAvailPorts(device.serialNumber)
  } else {
    //log('NOT OUR SERIAL NUMBER')
  }
}

function checkIfWBMdevice(device) {

  //on mac serial port is not available for a moment
  if (isMac) {
    //Would be better to somehow wait for a serial port event /////////////////////////////////////////////
    setTimeout(() => {
      isThisOurSerialNumber(device)
    }, 1000);

    //on Windows the Serial Port is ready immediatly
  } else {
    isThisOurSerialNumber(device)
  }
}

//Find serial port associated with a serial number
function findSerNumInAvailPorts(targetSerNum) {
  var type
  SerialPort.list().then(
    ports => {
      ports.forEach((port) => {
        //log(`${port.path}\t${port.serialNumber || ''}\t${port.manufacturer || ''}`)
        //log('THIS HERE')
        //log("PORT SN: " + port.serialNumber.toUpperCase())
        //log("TRGT SN: " + targetSerNum)
        if (port.serialNumber === targetSerNum) {

          //If we are expecting this device during a frimware upload process
          if (targetSerNum === "WBMBXYZABC" && firmwareUpload === true) {
            log("Found Device ready for firmware as expected")
            uploadFirmware(port.path, pathToFirmware)

            //Device is in bootloader and we werent expecting it
          } else if (targetSerNum == "WBMBXYZABC") {
            log('-ERROR Somehow a device is in bootloader mode unexpectadly')

            //Device is ours and we want to connect to it via serial
          } else {
            try {
              type = createPort(port.path, targetSerNum)
              log("CONNECTED " + port.serialNumber)
              log("# of active connections = " + conDevs.length)
            } catch (error) {
              log('--ERROR creating port ' + error)
            }
          }
        }
      })
    },
    err => {
      console.error('Error listing ports', err)
    }
  )
}

//Renderer wants to see conDevs
ipcMain.on('showDevs', (event) => {
  event.reply('devList', conDevs)
})

//IF A DEVICE IS SELECTED IN THE DEVICES MENU
function selectDevice(e) {
  log('Selected ' + e.id)
  showDeviceInfo(e.id)
}

//Device Info Window
let devInfoWinActive = false
function showDeviceInfo(serNum) {
  if (devInfoWinActive) {

  } else {
    var devWin = new BrowserWindow(
      {
        height: 300,
        width: 800,
        webPreferences: {
          nodeIntegration: true
        }
      }
    );

    devWin.setMenu(null);

    //Load the html file into the window
    devWin.loadURL(url.format({
      pathname: path.join(__dirname, 'devWindow.html'),
      protocol: 'file',
      slashes: true
    }));
    // Quit add window on close
    devWin.on('closed', function () {
      //app.quit();
      devInfoWinActive = false
    });
    devInfoWinActive = true

    //Set callback to provide the device info window with the data it needs when it asks
    ipcMain.on('whoSpawnedDevice', (event) => {
      for (var i = 0; i < conDevs.length; i++) {
        if (conDevs[i].info.serialNumber === serNum) {
          event.reply('thisDevice', conDevs[i].info)
        }
      }

    })
  }
}


///// FIRMWARE
function uploadFirmware(port, path) {
  log('In getNetInfo()')

  var argumentsx = ['-d', '-u', '-i', '-o', '0x2000', '-p', port, '-e', '-w', '-v', '-R', '-b', path]

  execFile(filePath, argumentsx, (error, stdout, stderr) => {
    if (error) {
      log(`child process ERROR ${error}`);
      firmwareUpload = false
      throw error;
    }

    log(stdout);
    log(`child process FINISHED`);
    firmwareUpload = false
  });
}

function selectDeviceAndFWfile() {
  let devList = []
  for (var i = 0; i < conDevs.length; i++) {
    devList[i] = conDevs[i].info.serialNumber
  }
  let dev = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: devList
  })
  log('IN FIRMWARE SELECT') // prints "ping"
  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Config File', extensions: ['gpiofw'] }
    ]
  }).then(result => {
    if (result.canceled) {
      log('FIRMWARE SELECT CANCELED')
    } else {
      if (firmwareUpload) {
        log('CANT UPLOAD FIRMWARE - UPLOAD ALREADY IN PROGRESS')
      } else {
        log(result.filePaths[0])
        pathToFirmware = result.filePaths[0]
        firmwareUpload = true
        conDevs[dev].port.write('WBM FIRMWARE REBOOT COMMAND')
        //uploadFirmware(conDevs[dev].ports.path, result.filePaths[0])
      }
    }
  }).catch(err => {
    log(err)
  })
}

ipcMain.on('uploadFirm', (event) => {
  selectDeviceAndFWfile()
})
///////////////////////////////////////////////////////////////////////////////////////////


function log(msg) {
  win.webContents.send('mainlog', msg)
}