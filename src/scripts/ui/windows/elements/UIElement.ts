import HTMLCompatible from '../../api/HTMLCompatible.js';

export default abstract class UIElement implements HTMLCompatible {
  protected rootElement: HTMLElement;

  protected constructor(...classes: Array<string>) {
    this.setupRootElement();
    classes.forEach(this.addCSSClass.bind(this));
  }

  public append(child: UIElement): void {
    this.rootElement.appendChild(child.getRootDOMElement());
  }

  public getRootDOMElement(): HTMLElement {
    return this.rootElement;
  }

  public addCSSClass(this: UIElement, className: string): void {
    this.getRootDOMElement().classList.add(className);
  }

  public removeCSSClass(className: string): void {
    this.getRootDOMElement().classList.remove(className);
  }

  protected appendDOMElement(element: HTMLElement): void {
    this.rootElement.appendChild(element);
  }

  protected setupRootElement(): void {
    this.rootElement = document.createElement('div');
  }
}