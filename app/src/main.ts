import { BrowserWindow, app } from 'electron';
import config from '../config';
let mainWindow: Electron.BrowserWindow | null = null;

function createWindow(): void {
    let option: Electron.BrowserWindowConstructorOptions = {
        title: 'NDM',
        width: 1300,
        height: 700,
        minHeight: 500,
        minWidth: 940,
        backgroundColor: '#292a2f',
        show: false,
        frame: false,
        transparent: false,
        webPreferences: {
            nodeIntegration: true
        }
    };
    if (process.platform != "win32")
        delete option.frame;
        
    mainWindow = new BrowserWindow(option);
    mainWindow.webContents.openDevTools();
    if(process.env.NODE_ENV == 'development'){
        mainWindow.loadURL(config.url);
    } 
    
    if(process.env.NODE_ENV == 'production'){
        mainWindow.loadFile(config.file);
    }
    mainWindow.webContents.session.clearCache(() => { });
    // mainWindow.webContents.openDevTools();
    mainWindow.on('ready-to-show', () => { 
        if(mainWindow !== null)
            mainWindow.show() 
    });
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
        app.quit()
    })
}
app.on('ready', () => {
    createWindow();
})