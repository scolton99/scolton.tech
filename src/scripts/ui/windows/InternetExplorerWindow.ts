import Window, {CloseButtons} from './api/Window.js';
import UIElement from './elements/UIElement.js';

export default class InternetExplorerWindow extends Window {
    public constructor() {
        super("Internet Explorer", CloseButtons.CLOSE_RESTORE_MAX_MIN);

        this.registerContent(new class extends UIElement {
            public constructor() {
                super();

                const iframe = this.rootElement as HTMLIFrameElement;
                iframe.src = "https://www.google.com";
            }

            protected setupRootElement(): void {
                this.rootElement = document.createElement("iframe");
            }
        });
    }

    public getIconName(): string {
        return "internet-explorer";
    }

    public static getDefaultIconName(): string {
        return "internet-explorer";
    }

    public static getWindowClassName(): string {
        return "internet-explorer";
    }
}