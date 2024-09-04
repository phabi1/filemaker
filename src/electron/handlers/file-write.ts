import { dialog, ipcMain } from "electron";
import { writeFile } from "fs/promises";
import { Builder } from "xml2js";

export default function () {
  ipcMain.handle(
    "file:write",
    async (event, data: { filepath: string; content: any }) => {
      try {
        const json = {
          METADATA: {
            FIELD: data.content.headers.map((header: any) => ({
              $: { NAME: header.name },
            })),
          },
          RESULTSET: data.content.rows.map((row: any) => ({
            ROW: data.content.headers.map((header: any) => ({
              COL: {
                DATA: row[header.name],
              },
            })),
          })),
        };

        const builder = new Builder({
          rootName: "FMPXMLRESULT",
        });
        const xml = builder.buildObject(json);
        await writeFile(data.filepath, xml, "utf-8");
      } catch (err) {
        dialog.showErrorBox("Impossible to save", err.message);
      }
    }
  );
}
