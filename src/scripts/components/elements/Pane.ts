/// <reference path="./UIElement.ts" />

namespace Win98 {
    export class Pane extends UIElement {
        public constructor(className?: string) {
            super();

            if (className) {
                this.getRootDOMElement().classList.add(className);
            }
        }
    }
}