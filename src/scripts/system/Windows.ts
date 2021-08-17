import Taskbar from '../ui/taskbar/Taskbar.js';
import WindowManager from './WindowManager.js';
import ImagePreloader from '../ui/util/ImagePreloader.js';
import Async from '../util/Async.js';

export default class Windows {
  private taskbar: Taskbar;
  private readonly windowManager: WindowManager;
  private static readonly bootDelay: number = 3000;
  private static readonly standbyDelay: number = 2000;

  public constructor() {
    const deny: { (arg0: Event): boolean } = event => {
      event.preventDefault();
      return false;
    };

    window.addEventListener('selectstart', deny);
    window.addEventListener('contextmenu', deny);

    this.windowManager = new WindowManager();
  }

  public async boot(): Promise<void> {
    await ImagePreloader.all();
    this.taskbar = new Taskbar(this.windowManager);
  }

  public async start(): Promise<Windows> {
    Windows.showBootSplash();
    await Async.waitAtLeast(Windows.bootDelay, this.boot());
    Windows.hideBootSplash();
    return new Windows();
  }

  private static showBootSplash() {
    const splash = document.createElement('div');
    splash.classList.add('boot-splash');

    document.body.appendChild(splash);
  }

  private static hideBootSplash() {
    document.body.removeChild(document.querySelector('body > .boot-splash'));
  }

  public wakeup(): void {
    document.body.removeChild(document.querySelector('body > .dark-shade'));
  }

  public standby(): void {
    const shade = document.createElement('div');
    shade.classList.add('dark-shade');

    document.body.appendChild(shade);

    window.setTimeout(() => {
      shade.addEventListener('mousemove', this.wakeup.bind(this));
    }, Windows.standbyDelay);
  }

  public shutdown(): void {
    this.windowManager.shutdown();
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('safe-to-turn-off');

    const message = document.createElement('span');
    message.appendChild(document.createTextNode('It\'s now safe to turn off'));
    message.appendChild(document.createElement('br'));
    message.appendChild(document.createTextNode('your computer.'));

    messageContainer.appendChild(message);
    document.body.appendChild(messageContainer);
  }

  public getWindowManager(): WindowManager {
    return this.windowManager;
  }

  public getTaskbar(): Taskbar {
    return this.taskbar;
  }
}
