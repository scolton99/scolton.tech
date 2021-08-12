import UIElement from './UIElement.js';
import Button from './Button.js';

export default class ButtonSet extends UIElement {
  public constructor(buttons: Array<Button>, buttonClasses?: Array<string>, ...classes: Array<string>) {
    super(...classes);

    this.addCSSClass('button-set');

    buttons.forEach(button => {
      buttonClasses && buttonClasses.forEach(button.addCSSClass.bind(button));
      this.append(button);
    });
  }
}