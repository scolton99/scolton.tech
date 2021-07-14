/// <reference path="./UIElement.ts" />
/// <reference path="../../util/Resources.ts" />

namespace Win98 {
    export class Icon extends UIElement {
        private iconName: string;

        public constructor(iconName: string) {
            super();

            this.setIconName(iconName);
        }

        protected setupRootElement() {
            this.rootElement = document.createElement("img");
        }

        public getRootDOMImageElement(): HTMLImageElement {
            return this.getRootDOMElement() as HTMLImageElement;
        }

        private updateIcon(): void {
            this.getRootDOMImageElement().src = Resources.getCategoricalImage('window-content', this.iconName);
        }

        public setIconName(iconName: string): void {
            this.iconName = iconName;
            this.updateIcon();
        }

        public getIconName(): string {
            return this.iconName;
        }
    }
}