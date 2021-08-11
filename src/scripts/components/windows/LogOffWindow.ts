namespace Win98 {
    export class LogOffWindow extends ShadeWindow {
        public constructor() {
            super("null", CloseButtons.CLOSE_ONLY);

            const content = new Pane();
            content.getRootDOMElement().style.width = "300px";
            content.getRootDOMElement().style.height = "150px";

            this.registerContent(content);
        }

        onDisplay() {
            super.onDisplay();

            this.fitContent();
            this.center();
        }

        getIconName(): string {
            return null;
        }
    }
}