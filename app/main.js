const path = require('path')
const { app, BrowserWindow } = require('electron')

require('electron-debug')({})

app.on('ready', () => {

    const window = new BrowserWindow({
        width: parseInt(process.env.URL_LAUNCHER_WIDTH) || 1920,
        height: parseInt(process.env.URL_LAUNCHER_HEIGHT) || 1080,
        kiosk: true,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'fivethirtyeight/index.js')
        }
    })

    window.loadURL('http://projects.fivethirtyeight.com/2016-election-forecast/', {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.41 Safari/537.36'
    })
})
