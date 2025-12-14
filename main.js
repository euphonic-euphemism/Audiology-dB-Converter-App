const { app, BrowserWindow } = require('electron');
const path = require('path');

// Global reference to the window object to prevent garbage collection
let mainWindow;

/**
 * Creates the main application window and loads the HTML file.
 */
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 600, // Set initial width
    height: 800, // Set initial height
    minWidth: 500,
    minHeight: 700,
    webPreferences: {
      // Use node integration for the main process (useful for Electron APIs)
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the index.html file from the current directory
  mainWindow.loadFile('index.html');

  // Open the DevTools (optional, for debugging during development)
  // mainWindow.webContents.openDevTools();

  // Dereference the window object when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// When Electron is ready, create the window
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS (standard behavior)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate a window if the app is activated and no windows are open (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
