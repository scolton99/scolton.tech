/// <reference path="./UIElement.ts" />
/// <reference path="./Button.ts" />

namespace Win98 {
    export class ButtonSet extends UIElement {
        public constructor(buttons: Array<Button>) {
            super();

            this.addCSSClass("button-set");

            buttons.forEach(this.append.bind(this));
        }
    }
}