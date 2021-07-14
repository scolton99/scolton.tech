/// <reference path="../util/DOMComponent.ts" />
/// <reference path="./taskbar/StartButton.ts" />
/// <reference path="../util/WindowManager.ts" />

namespace Win98 {
    export class Taskbar extends DOMComponent {
        private startButton: StartButton;
        private openWindows: Array<Window> = [];
        private windowDOMElements: Map<Window, HTMLElement> = new Map<Win98.Window, HTMLElement>();

        getId(): string {
            return "taskbar";
        }

        constructor(windowManager: WindowManager) {
            super();

            this.startButton = new StartButton();

            windowManager.register(this.openWindowsChange.bind(this));
        }

        private openWindowsEl() {
            return this.el.querySelector("#taskbar-open-windows");
        }

        public openWindowsChange(newOpenWindows: Array<Window>) {
            let changed: boolean = false;
            for (const newOpenWindow of newOpenWindows) {
                if (!this.openWindows.includes(newOpenWindow) && newOpenWindow.shouldAppearOnTaskbar()) {
                    this.openWindows.push(newOpenWindow);
                    changed = true;
                }
            }
            if (changed)
                this.renderOpenWindows();

            for (const existingWindow of this.openWindows) {
                if (!newOpenWindows.includes(existingWindow)) {
                    const windowEl = this.windowDOMElements.get(existingWindow);
                    windowEl.parentElement.removeChild(windowEl);
                    this.openWindows.splice(this.openWindows.indexOf(existingWindow), 1);
                }
            }
        }

        private renderOpenWindows() {
            const el = this.openWindowsEl();

            while (el.firstElementChild)
                el.removeChild(el.firstElementChild);

            for (const window of this.openWindows) {
                if (!this.windowDOMElements.has(window)) {
                    const windowEntry = document.createElement("span");
                    windowEntry.textContent = window.getTitle();
                    this.windowDOMElements.set(window, windowEntry);
                }

                const windowEl = this.windowDOMElements.get(window);
                el.appendChild(windowEl);
            }
        }
    }
}
