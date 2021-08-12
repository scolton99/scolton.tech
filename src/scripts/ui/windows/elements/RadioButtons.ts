import Action from '../../../actions/Action.js';
import UIElement from './UIElement.js';
import UUID from '../../../util/UUID.js';

export interface RadioButton {
  name: string,
  value?: string,
  action?: Action,
  default?: boolean
}

export enum RadioButtonsOrientation {
  VERTICAL   = 'radio-buttons-vert',
  HORIZONTAL = 'radio-buttons-horiz'
}

export default class RadioButtons extends UIElement {
  private readonly name: string;
  private orientation: RadioButtonsOrientation;

  private readonly items: Array<RadioButton>;
  private readonly domElements: Map<RadioButton, HTMLInputElement> = new Map<RadioButton, HTMLInputElement>();

  private readonly changeCallbacks: Array<{ (newValue: string): void }> = [];

  public constructor(items: Array<RadioButton>, orientation: RadioButtonsOrientation = RadioButtonsOrientation.VERTICAL, itemClasses?: Array<string>, ...classes: Array<string>) {
    super(...classes);

    this.name  = UUID.generate();
    this.items = items.map(RadioButtons.assumeValue.bind(RadioButtons));

    this.setOrientation(orientation);

    this.items.forEach(item => {
      const domElement: HTMLInputElement = this.makeItem(item);

      this.domElements.set(item, domElement);
      this.appendDOMElement(RadioButtons.addLabel(item, domElement, ...itemClasses));
    });
  }

  private static assumeValue(item: RadioButton): RadioButton {
    if (item.value) return item;

    return {
      ...item,
      value: item.name.replace(/\s/g, '-').toLowerCase()
    };
  }

  private static addLabel(item: RadioButton, domItem: HTMLInputElement, ...classes: Array<string>): HTMLElement {
    const label       = document.createElement('label');
    label.htmlFor     = domItem.id;
    label.textContent = item.name;

    const container = document.createElement('div');
    container.classList.add('radio-button-group', ...classes);
    container.appendChild(domItem);
    container.appendChild(label);

    return container;
  }

  public getValue(): string {
    const selectedItem = this.getSelectedItem();

    return selectedItem ? selectedItem.value : null;
  }

  public setOrientation(orientation: RadioButtonsOrientation): void {
    this.removeCSSClass(this.orientation);
    this.addCSSClass(orientation);
    this.orientation = orientation;
  }

  public action(): Action {
    return new class implements Action {
      private readonly outer: RadioButtons;

      public constructor(outer: RadioButtons) {
        this.outer = outer;
      }

      public run(): void {
        const selected = this.outer.getSelectedItem();

        if (!selected)
          return;

        if (selected.action)
          selected.action.run();
      }
    }(this);
  }

  public addChangeListener(callback: { (newValue: string): void }): void {
    this.changeCallbacks.push(callback);
  }

  private makeItem(item: RadioButton): HTMLInputElement {
    const domItem = document.createElement('input');
    domItem.type  = 'radio';
    domItem.name  = this.name;
    domItem.value = item.value;
    domItem.id    = UUID.generate();

    if (item.default)
      domItem.checked = true;

    domItem.addEventListener('change', this.onChange.bind(this));

    return domItem;
  }

  private getSelectedItem(): RadioButton {
    const set = Array.from(this.domElements.entries()).find(([, el]) => el.checked);

    return set && set instanceof Array ? set[0] : null;
  }

  private onChange() {
    const newValue = this.getValue();
    this.changeCallbacks.forEach(callback => void callback.call(null, newValue));
  }
}
