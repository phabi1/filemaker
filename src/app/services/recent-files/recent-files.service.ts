import { Subject } from "rxjs";
import { IRecentFilesStorage } from "./storage/storage.interface";

export class RecentFilesService {
  private filesChangedSubject: Subject<void> = new Subject<void>();
  private files: string[] = [];

  constructor(private readonly storage: IRecentFilesStorage) {}

  async load() {
    this.files = await this.storage.load();
    this.filesChangedSubject.next();
  }

  async addFile(file: string): Promise<void> {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }

    this.files.push(file);

    await this.storage.save(this.files);
    this.filesChangedSubject.next();
  }

  async removeFile(file: string): Promise<void> {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
      await this.storage.save(this.files);
      this.filesChangedSubject.next();
    }

  }

  getFiles() {
    return this.files;
  }

  async clear() {
    this.files = [];
    await this.storage.save([]);
    this.filesChangedSubject.next();
  }

  get filesChanged() {
    return this.filesChangedSubject.asObservable();
  }
}
