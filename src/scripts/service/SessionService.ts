export default class SessionService {
  public set(key: string, value: string): void {
    SessionService.getStorage().setItem(key, value);
  }

  public get(key: string, def: string | null): string | null {
    const storedValue = SessionService.getStorage().getItem(key);
    return storedValue === null ? def : storedValue;
  }

  private static getStorage(): Storage {
    return window.localStorage;
  }
}