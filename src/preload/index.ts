
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getAllMacAddresses: async () => ipcRenderer.invoke('api:getAllMacAddresses'),
    getCurrentMacAddress: async () => ipcRenderer.invoke('api:getCurrentMacAddress'),
    getData: (args: any) => ipcRenderer.invoke('api:getData', args),
    saveData: (data: any) => ipcRenderer.invoke('api:saveData', data),
  })
} catch (error) {
  console.error(error)
}