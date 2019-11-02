// Node modules
const url = require('url');
const path = require('path');

// Electron modules
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

const isDev = process.env.NODE_ENV === 'development';

const getFormattedUrl = pathname => {
  let options;
  if(isDev) {
    options = {
      protocol: 'http',
      hostname: 'localhost',
      port: 3000,
      pathname,
      slashes: true
    };
  } else {
    options = {
      protocol: 'file',
      pathname: path.join(__dirname, pathname),
      slashes: true
    };
  }

  return url.format(options);
};

const createMainWindow = () => {
  const mainViewURL = getFormattedUrl('/index.html');
  console.log('criando a maaaiinni', mainViewURL);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(mainViewURL);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
