import Window from '../ui/windows/api/Window.js';

export interface WindowSize {
  height: number,
  width: number
}

export default class WindowManager {
  private static readonly MAX_Z_INDEX: number  = 10_000;
  private static readonly WINDOWS_CONTAINER_ID = 'open-windows';
  private readonly el: HTMLElement;

  private lastWindowSize: WindowSize;

  private readonly openWindows: Array<Window> = [];
  private readonly callbacks: Array<{ (): void }> = [];

  public constructor() {
    this.el = document.getElementById(WindowManager.WINDOWS_CONTAINER_ID);

    this.lastWindowSize = {
      height: window.innerHeight,
      width: window.innerWidth
    };

    window.addEventListener('resize', this.resizeDesktop.bind(this));

    if (!this.el)
      throw new Error(`Couldn't find element #${WindowManager.WINDOWS_CONTAINER_ID} to hold open windows`);
  }

  public register(cb: (() => void)): void {
    this.callbacks.push(cb);
  }

  public refresh(): void {
    this.callbacks.forEach(it => { it.call(null, this.openWindows); });
  }

  public shutdown(): void {
    this.openWindows.forEach(this.close.bind(this));
  }

  public open(window: Window): void {
    this.openWindows.unshift(window);

    this.el.appendChild(window.getSurroundingWindowElement());
    window.onDisplay();

    this.refresh();
    this.reorder();
  }

  public close(window: Window): void {
    if (!this.openWindows.includes(window))
      return;

    this.openWindows.splice(this.openWindows.indexOf(window), 1);
    this.el.removeChild(window.getSurroundingWindowElement());
    window.onClose();

    this.refresh();
    this.reorder();
  }

  public focus(window: Window): void {
    if (!this.openWindows.includes(window))
      throw new Error('Can\'t focus requested window because it does not exist in the set of open windows');

    const index = this.openWindows.indexOf(window);
    this.openWindows.splice(index, 1);

    this.openWindows.unshift(window);
    this.reorder();
  }

  private reorder(): void {
    if (this.openWindows.length === 0)
      return;

    this.openWindows[0].focus();

    for (let i = WindowManager.MAX_Z_INDEX; WindowManager.MAX_Z_INDEX - i < this.openWindows.length; --i) {
      const idx           = WindowManager.MAX_Z_INDEX - i;
      const currentWindow = this.openWindows[idx];

      if (currentWindow.showingAbove()) {
        currentWindow.setZIndex(WindowManager.MAX_Z_INDEX * 2);
      } else {
        currentWindow.setZIndex(i);
        if (i !== WindowManager.MAX_Z_INDEX)
          currentWindow.blur();
      }
    }
  }

  public resizeDesktop(): void {
    this.openWindows.forEach(it => it.resizeDesktop(this.lastWindowSize));
    this.lastWindowSize = { width: window.innerWidth, height: window.innerHeight };
  }
}