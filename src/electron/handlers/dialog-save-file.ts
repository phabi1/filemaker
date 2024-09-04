import { app, dialog, ipcMain } from "electron";

export default function () {
    ipcMain.handle('dialog:save-file', async () => {
        const {canceled, filePath} = await dialog.showSaveDialog({
            defaultPath: app.getPath("downloads")
        });

        if (canceled) {
            return '';
        }

        return filePath;
    })
}