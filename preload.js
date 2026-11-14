const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadData: () => ipcRenderer.invoke('ddragon:load'),
  openExternal: (url) => ipcRenderer.invoke('open:external', url),
  enableLcu: (enabled) => ipcRenderer.invoke('lcu:enable', enabled),
  onLcuUpdate: (cb) => ipcRenderer.on('lcu:update', (_e, payload) => cb(payload)),
});
