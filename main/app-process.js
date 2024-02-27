// main/app-process.js

const { BrowserWindow } = require("electron");
const path = require("path");

function createAppWindow() {
    let parentWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    parentWindow.loadFile('./renderers/home.html');

    parentWindow.on('closed', () => {
        parentWindow = null;
    });
}

module.exports = createAppWindow;