import ServiceManager from '../service/ServiceManager.js';
import Action from './Action.js';

export default class StandbyAction implements Action {
  public run(): void {
    ServiceManager.getWindows().standby();
  }
}