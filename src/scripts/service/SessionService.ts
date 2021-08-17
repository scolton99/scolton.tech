import JSONValue from '../util/JSONValue.js';

export default class SessionService {
  public set(key: string, value: string): void {
    SessionService.getStorage().setItem(key, value);
  }

  public get(key: string, def: string | null): string | null {
    const storedValue = SessionService.getStorage().getItem(key);
    return storedValue === null ? def : storedValue;
  }

  public setObject(key: string, obj: JSONValue): void {
    this.set(key, JSON.stringify(obj));
  }

  public getObject(key: string, def: JSONValue): JSONValue {
    const storedObject = JSON.parse(this.get(key, null)) as JSONValue;
    return storedObject === null ? def : storedObject;
  }

  private static getStorage(): Storage {
    return window.localStorage;
  }
}