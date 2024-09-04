import { ipcMain } from "electron";
import { readFile } from "fs/promises";
import { Parser } from "xml2js";

export default function () {
  ipcMain.handle("file:read", async (event, path: string) => {
    const content = await readFile(path, "utf-8");
    const parser = new Parser();
    const parsed = await parser.parseStringPromise(content);

    const headers = parsed.FMPXMLRESULT.METADATA[0].FIELD.map((field: any) => ({
      name: field.$.NAME,
      type: "text",
    }));
    const rows = parsed.FMPXMLRESULT.RESULTSET[0].ROW.map((row: any) => {
      const rowData: any = {};
      row.COL.forEach((col: any, index: number) => {
        rowData[headers[index].name] = col.DATA[0];
      });
      return rowData;
    });

    const data = {
      headers: headers,
      rows: rows,
    };

    return data;
  });
}
