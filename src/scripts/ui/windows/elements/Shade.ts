import UIElement from './UIElement.js';

export default class Shade extends UIElement {
  public constructor() {
    super();
  }

  public show(): void {
    this.rootElement.style.pointerEvents = 'auto';
    this.rootElement.style.display       = 'initial';
  }

  public hide(): void {
    this.rootElement.style.pointerEvents = 'none';
    this.rootElement.style.display       = 'none';
  }

  protected setupRootElement(): void {
    super.setupRootElement();

    this.rootElement.classList.add('shade');
  }
}
