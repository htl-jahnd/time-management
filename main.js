const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')
const Window = require('./window')
const {
    ipcMain
} = require('electron')

let mainWindow

function main() {
    createWindow()
}

function createWindow() {
    mainWindow = new Window({
        file: path.join('assets', 'login.html'),
        height: 400,
        width: 450
    })
    mainWindow.webContents.openDevTools();
}

app.on('ready', main)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('sign-in', (event, usr) => {
    //TODO make db sign-in
})