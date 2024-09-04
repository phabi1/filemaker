import { IRecentFilesStorage } from "./storage.interface";

export class LocalRecentFilesStrorage implements IRecentFilesStorage {
  private static readonly RECENT_FILES_KEY = "recent-files";

  load(): Promise<string[]> {
    const files = localStorage.getItem(
      LocalRecentFilesStrorage.RECENT_FILES_KEY
    );
    return Promise.resolve(files ? JSON.parse(files) : []);
  }
  
  save(files: string[]): Promise<void> {
    localStorage.setItem(
      LocalRecentFilesStrorage.RECENT_FILES_KEY,
      JSON.stringify(files)
    );
    return Promise.resolve();
  }
}
