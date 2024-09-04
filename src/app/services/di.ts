export class Di {
  private static _instance: Di;

  private services: Map<string, any> = new Map();

  public register(name: string, service: any): void {
    this.services.set(name, service);
  }

  public get<T>(name: string): T {
    return this.services.get(name);
  }

  public static get instance(): Di {
    if (!Di._instance) {
      Di._instance = new Di();
    }
    return Di._instance;
  }
}