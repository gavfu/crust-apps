// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BrowserWindow, screen } from 'electron';
import path from 'path';

export function createWindow (environment: string): Promise<BrowserWindow> {
  return new Promise((resolve, reject) => {
    const { height, width } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
      height,
      icon: path.join(__dirname, 'icon.png'),
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js')
      },
      width
    });

    if (environment === 'development') {
      win.webContents.openDevTools();
      win.loadURL('http://127.0.0.1:3000/');
      resolve(win);
    }

    const mainFilePath = path.resolve(__dirname, 'index.html');
    win.loadFile(mainFilePath);
    resolve(win);
  })
}
