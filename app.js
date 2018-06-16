const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const client = require('./client');

let mainWindow;

function createWindow () {
    // Run web app
    client;
    
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
  
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:8222');
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// create menu

const template = [
    {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          // {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            label: 'Setting',
            accelerator: 'Ctrl+Shift+H'
          },
          {role: 'minimize'},
          {role: 'close'}
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Check for Updates...'
          },
          {
            label: 'About'
          }
        ]
      }
];

if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
            label: 'Setting',
            accelerator: 'Alt+Command+H'
        },
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
})

// Edit menu
template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)