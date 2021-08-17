import ServiceManager from '../service/ServiceManager.js';
import Action from './Action.js';
import {WindowCreator} from '../system/WindowManager.js';

export default class NewWindowAction implements Action {
  private readonly type: WindowCreator;

  public constructor(window: WindowCreator) {
    this.type = window;
  }

  public run(): void {
    ServiceManager.getWindows().getWindowManager().open(new this.type);
  }
}