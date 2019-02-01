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
        file: path.join('assets','login', 'login.html'),
        height: 400,
        width: 450
    })
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

    mainWindow = new Window({
        file: path.join('assets', 'index', 'index.html'),
            height: 600,
            width: 700
    })
})

ipcMain.on('sign-up', (event, usr) => {
    //TODO make db sign-up
})