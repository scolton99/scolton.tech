import UIElement from './UIElement.js';

export default class Label extends UIElement {
  public constructor(text: string, ...classes: Array<string>) {
    super('label', ...classes);

    this.rootElement.textContent = text;
  }

  protected setupRootElement(): void {
    this.rootElement = document.createElement('span');
  }
}