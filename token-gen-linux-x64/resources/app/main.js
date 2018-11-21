// ./main.js
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win = null;

function createWindow() {
    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 800, height: 600, icon: path.join(__dirname, "public/images/icon.png")});

    // Specify entry point
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);

    // Show dev tools
    // Remove this line before distributing
    // win.webContents.openDevTools();

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

    win.title = "";
}


app.on('ready', function () {

    createWindow();

});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});
