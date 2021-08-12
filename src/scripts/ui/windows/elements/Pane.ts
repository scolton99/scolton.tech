import UIElement from './UIElement.js';

export default class Pane extends UIElement {
  public constructor(...classes: Array<string>) {
    super();

    this.rootElement.classList.add(...classes);
  }
}