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

        public addCSSClass(className: string): void {
            this.getRootDOMElement().classList.add(className);
        }

        public removeCSSClass(className: string): void {
            this.getRootDOMElement().classList.remove(className);
        }

        public toggleCSSClass(className: string): void {
            this.getRootDOMElement().classList.toggle(className);
        }
    }
}