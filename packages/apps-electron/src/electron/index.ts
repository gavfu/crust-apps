// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { app, BrowserWindow, shell } from 'electron';

import { registerAccountStoreHandlers } from '../main/account-store';
import { setupAutoUpdater } from './autoUpdater';
import { setupContentSecurityPolicy } from './contentSecurityPolicy';
import { createWindow } from './window';

const ENV = process.env.NODE_ENV || 'production';
let win: BrowserWindow;

app.on('web-contents-created', (_, webContents): void => {
  webContents.on('new-window', (e, url): void => {
    e.preventDefault();
    shell.openExternal(url).catch(console.error);
  });
});

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}

app.on('second-instance', () => {
  if (process.platform === 'win32') {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
      }
      if (win.isVisible()) {
        win.focus()
      } else {
        win.show()
      }
   }}
})

app
  .whenReady()
  .then(async (): Promise<void> => {
    registerAccountStoreHandlers();
    setupContentSecurityPolicy(ENV);

    win = await createWindow(ENV);
    await setupAutoUpdater();
  })
  .catch(console.error);
