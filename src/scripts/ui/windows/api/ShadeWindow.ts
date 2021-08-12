import Window, { CloseButtons } from './Window.js';
import Shade from '../elements/Shade.js';

export default abstract class ShadeWindow extends Window {
  protected readonly shade: Shade;

  protected constructor(title: string, type: CloseButtons) {
    super(title, type);

    this.shade = new Shade();
    this.setSurroundingWindowElement(this.shade.getRootDOMElement());
  }

  protected showShade(): void {
    this.shade.show();
  }

  protected hideShade(): void {
    this.shade.hide();
  }
}