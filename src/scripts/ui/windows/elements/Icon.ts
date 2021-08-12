import UIElement from './UIElement.js';
import Resources from '../../util/Resources.js';

export default class Icon extends UIElement {
  private iconName: string;

  public constructor(iconName: string) {
    super();

    this.setIconName(iconName);
  }

  public getRootDOMImageElement(): HTMLImageElement {
    return this.getRootDOMElement() as HTMLImageElement;
  }

  public setIconName(iconName: string): void {
    this.iconName = iconName;
    this.updateIcon();
  }

  public getIconName(): string {
    return this.iconName;
  }

  protected setupRootElement(): void {
    this.rootElement = document.createElement('img');
  }

  private updateIcon(): void {
    this.getRootDOMImageElement().src = Resources.getCategoricalImage('window-content', this.iconName);
  }
}