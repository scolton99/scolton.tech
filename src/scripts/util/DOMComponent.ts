namespace Win98 {
    export abstract class DOMComponent {
        protected el: HTMLElement;

        protected constructor() {
            this.el = document.getElementById(this.getId());

            if (!this.el) {
                throw new Error(`Couldn't find element #${this.getId()}`);
            }

            this.el.addEventListener('click', event => {
                if (event.target === this.el) {
                    this.click(event);
                }
            });
            window.addEventListener('click', event => {
                if (event.target !== this.el) {
                    this.clickOff(event);
                }
            });
        }

        abstract getId(): string;

        public click(event) {}
        public clickOff(event) {}
    }
}
