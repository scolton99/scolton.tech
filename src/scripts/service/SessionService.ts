import JSONValue, { JSONObject } from '../util/JSONValue.js';

export default class SessionService {
  private getRootObject(): JSONObject {
    const result = SessionService.getStorage().getItem("windows");

    return result ? JSON.parse(result) as JSONObject : {};
  }

  private setRootObject(obj: JSONObject): void {
    SessionService.getStorage().setItem("windows", JSON.stringify(obj));
  }

  public set(key: string, value: string): void {
    const storage = this.getRootObject();

    storage[key] = value;

    this.setRootObject(storage);
  }

  public get(key: string, def: JSONValue): JSONValue {
    const storedValue = this.getRootObject()[key];
    return (typeof(storedValue) === 'undefined' || storedValue === null) ? def : storedValue;
  }

  private static getStorage(): Storage {
    return window.localStorage;
  }
}