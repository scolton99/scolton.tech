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
    window.addEventListener('error', e => {
      Windows.BSOD(e.error);
    });
  }

  public async start(): Promise<Windows> {
    try {
      Windows.showBootSplash();
      await Async.waitAtLeast(Windows.bootDelay, this.boot());
      Windows.hideBootSplash();
      return new Windows();
    } catch (e) {
      Windows.BSOD(e);
      throw e;
    }
  }

  private static showBootSplash() {
    const splash = document.createElement('div');
    splash.classList.add('boot-splash');

    document.body.appendChild(splash);
  }

  private static hideBootSplash() {
    document.body.removeChild(document.querySelector('body > .boot-splash'));
  }

  private static BSOD(e: Error): void {
    const BSOD = document.createElement("div");
    BSOD.classList.add("BSOD");

    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Windows";

    const body = document.createElement("div");
    body.classList.add("body");
    body.textContent = `A fatal exception ${e.message} has occurred.`;

    const details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = e.stack.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');

    container.append(title, body, details);
    BSOD.append(container);

    document.body.append(BSOD);
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
