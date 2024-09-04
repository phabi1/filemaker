export interface IRecentFilesStorage {
  load: () => Promise<string[]>;
  save: (files: string[]) => Promise<void>;
}
