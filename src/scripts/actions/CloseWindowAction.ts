import Action from './Action.js';
import ServiceManager from '../service/ServiceManager.js';
import Window from '../ui/windows/api/Window.js';

export default class CloseWindowAction implements Action {
  private readonly window: Window;

  public constructor(window: Window) {
    this.window = window;
  }

  public run(): void {
    ServiceManager.getWindows().getWindowManager().close(this.window);
  }
}