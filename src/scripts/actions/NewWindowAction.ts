import ServiceManager from '../service/ServiceManager.js';
import Action from './Action.js';
import Window from '../ui/windows/api/Window.js';

export default class NewWindowAction implements Action {
  private readonly type: new () => Window;

  public constructor(window: new () => Window) {
    this.type = window;
  }

  public run(): void {
    ServiceManager.getWindows().getWindowManager().open(new this.type);
  }
}