namespace Win98 {
    export abstract class UIElement implements HTMLCompatible {
        protected rootElement: HTMLElement;

        protected constructor() {
            this.setupRootElement();
        }

        public append(child: UIElement) {
            this.rootElement.appendChild(child.getRootDOMElement());
        }

        protected appendDOMElement(element: HTMLElement): void {
            this.rootElement.appendChild(element);
        }

        public getRootDOMElement(): HTMLElement {
            return this.rootElement;
        }

        protected setupRootElement(): void {
            this.rootElement = document.createElement("div");
        }
    }
}