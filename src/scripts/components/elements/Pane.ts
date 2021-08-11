/// <reference path="./UIElement.ts" />

namespace Win98 {
    export class Pane extends UIElement {
        public constructor(...classes: Array<string>) {
            super();

            this.rootElement.classList.add(...classes);
        }
    }
}