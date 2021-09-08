import ViewComponent from '../api/ViewComponent.js';
import Window from '../windows/api/Window.js';
import StartButton from './StartButton.js';
import WindowManager from '../../system/WindowManager.js';
import QuickLaunch from './ql/QuickLaunch.js';

export default class Taskbar extends ViewComponent {
  private readonly startButton: StartButton;
  private readonly quickLaunch: QuickLaunch;
  private readonly openWindows: Array<Window>                  = [];
  private readonly windowDOMElements: Map<Window, HTMLElement> = new Map<Window, HTMLElement>();

  public constructor(windowManager: WindowManager) {
    super();

    this.startButton = new StartButton();
    this.quickLaunch = new QuickLaunch();

    windowManager.registerCallback(this.openWindowsChange.bind(this));
  }

  public getId(): string {
    return 'taskbar';
  }

  public openWindowsChange(newOpenWindows: Array<Window>): void {
    let changed = false;
    for (const newOpenWindow of newOpenWindows) {
      if (!this.openWindows.includes(newOpenWindow) && newOpenWindow.shouldAppearOnTaskbar()) {
        this.openWindows.push(newOpenWindow);
        changed = true;
      }
    }
    if (changed)
      this.renderOpenWindows();

    for (const existingWindow of this.openWindows) {
      if (!newOpenWindows.includes(existingWindow)) {
        const windowEl = this.windowDOMElements.get(existingWindow);
        windowEl.parentElement.removeChild(windowEl);
        this.openWindows.splice(this.openWindows.indexOf(existingWindow), 1);
      }
    }
  }

  private openWindowsEl() {
    return this.el.querySelector('#taskbar-open-windows');
  }

  private static renderTaskbarEntry(window: Window): HTMLElement {
    const windowEntry       = document.createElement('span');
    windowEntry.textContent = window.getTitle();

    windowEntry.addEventListener('click', window.toggleMinimized.bind(window));

    return windowEntry;
  }

  private renderOpenWindows() {
    const el = this.openWindowsEl();

    while (el.firstElementChild)
      el.removeChild(el.firstElementChild);

    for (const window of this.openWindows) {
      if (!this.windowDOMElements.has(window)) {
        this.windowDOMElements.set(window, Taskbar.renderTaskbarEntry(window));
      }

      const windowEl = this.windowDOMElements.get(window);
      el.appendChild(windowEl);
    }
  }

  public get height(): number {
    return this.el.offsetHeight;
  }
}