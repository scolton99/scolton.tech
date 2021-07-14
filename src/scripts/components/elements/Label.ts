/// <reference path="./UIElement.ts" />

namespace Win98 {
    export class Label extends UIElement {
        public constructor(text: string) {
            super();

            this.rootElement.textContent = text;
        }

        protected setupRootElement() {
            this.rootElement = document.createElement("span");
        }
    }
}