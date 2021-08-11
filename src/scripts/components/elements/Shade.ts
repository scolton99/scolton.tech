namespace Win98 {
    export class Shade extends UIElement {
        public constructor() {
            super();
        }

        protected setupRootElement() {
            super.setupRootElement();

            this.rootElement.classList.add("shade");
        }

        public show(): void {
            this.rootElement.style.pointerEvents = "auto";
            this.rootElement.style.display = "initial";
        }

        public hide(): void {
            this.rootElement.style.pointerEvents = "none";
            this.rootElement.style.display = "none";
        }
    }
}