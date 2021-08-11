/// <reference path="./UIElement.ts" />
/// <reference path="./Button.ts" />

namespace Win98 {
    export class ButtonSet extends UIElement {
        public constructor(buttons: Array<Button>, buttonClasses?: Array<string>, ...classes: Array<string>) {
            super(...classes);

            this.addCSSClass("button-set");

            buttons.forEach(button => {
                buttonClasses && buttonClasses.forEach(button.addCSSClass.bind(button));
                this.append(button);
            });
        }
    }
}