import { contextBridge, ipcRenderer } from "electron";
import { Table } from "./shared/models/table.model";

contextBridge.exposeInMainWorld("electron", {
  openFile: () => ipcRenderer.invoke("dialog:open-file"),
  saveFile: () => ipcRenderer.invoke("dialog:save-file"),
  readFile: (filepath: string) => ipcRenderer.invoke("file:read", filepath),
  writeFile: (filepath: string, content: Table) =>
    ipcRenderer.invoke("file:write", { filepath, content }),
});
