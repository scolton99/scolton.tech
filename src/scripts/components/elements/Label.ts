/// <reference path="./UIElement.ts" />

namespace Win98 {
    export class Label extends UIElement {
        public constructor(text: string, ...classes: Array<string>) {
            super('label', ...classes);

            this.rootElement.textContent = text;
        }

        protected setupRootElement() {
            this.rootElement = document.createElement("span");
        }
    }
}