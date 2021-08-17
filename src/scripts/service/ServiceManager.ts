import Windows from '../system/Windows.js';
import SessionService from './SessionService.js';
import WindowManager from '../system/WindowManager.js';

export default class ServiceManager {
  private static windowsInstance: Windows;
  private static sessionInstance: SessionService;

  public static async initialize(): Promise<void> {
    ServiceManager.sessionInstance = new SessionService();
    ServiceManager.windowsInstance = new Windows();
    await ServiceManager.windowsInstance.start();
  }

  public static getWindows(): Windows {
    return ServiceManager.windowsInstance;
  }

  public static getSession(): SessionService {
    return ServiceManager.sessionInstance;
  }

  public static getWindowManager(): WindowManager {
    return ServiceManager.windowsInstance.getWindowManager();
  }
}