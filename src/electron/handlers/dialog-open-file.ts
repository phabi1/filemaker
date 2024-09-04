import { dialog, ipcMain } from "electron";

export default function () {
  ipcMain.handle("dialog:open-file", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
    });
    if (canceled) {
      return "";
    }
    return filePaths[0];
  });
}
