import { Table } from "./shared/models/table.model";

export interface IElectronAPI {
  openFile: () => Promise<string>;
  saveFile: () => Promise<string>;
  readFile: (filepath: string) => Promise<Table>;
  writeFile: (filepath: string, content: Table) => Promise<string>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
