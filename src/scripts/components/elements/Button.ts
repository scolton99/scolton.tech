/// <reference path="./UIElement.ts" />

namespace Win98 {
    export class Button extends UIElement {
        public constructor(name: string, action?: Action, primary?: boolean, ...classes: Array<string>) {
            super(...classes);

            this.addCSSClass("button");
            this.getRootDOMElement().textContent = name;

            if (primary)
                this.addCSSClass("border-primary");

            if (action)
                this.getRootDOMElement().addEventListener("click", action.run.bind(action));
        }

        protected setupRootElement() {
            this.rootElement = document.createElement("button");
        }
    }
}