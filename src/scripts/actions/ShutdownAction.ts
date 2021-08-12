import Action from './Action.js';
import ServiceManager from '../service/ServiceManager.js';

export default class ShutdownAction implements Action {
  public run(): void {
    ServiceManager.getWindows().shutdown();
  }
}