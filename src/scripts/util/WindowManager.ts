/// <reference path="../components/Window.ts" />

namespace Win98 {
    export class WindowManager {
        private static readonly MAX_Z_INDEX: number = 10_000;
        private static readonly WINDOWS_CONTAINER_ID = "open-windows";
        private readonly el: HTMLElement;

        private openWindows: Array<Window> = [];
        private callbacks: Array<Function> = [];

        public register(cb: Function) {
            this.callbacks.push(cb);
        }

        public constructor() {
            this.el = document.getElementById(WindowManager.WINDOWS_CONTAINER_ID);

            if (!this.el)
                throw new Error(`Couldn't find element #${WindowManager.WINDOWS_CONTAINER_ID} to hold open windows`);
        }

        public refresh() {
            this.callbacks.forEach(it => it.call(null, this.openWindows));
        }

        public open(window: Window) {
            this.openWindows.unshift(window);
            console.log(`Open windows: ${this.openWindows}`)

            this.el.appendChild(window.getWindowElement());
            window.onDisplay();

            this.refresh();
            this.reorder();
        }

        public close(window: Window): void {
            if (!this.openWindows.includes(window))
                return;

            this.openWindows.splice(this.openWindows.indexOf(window), 1);
            window.getWindowElement().parentElement.removeChild(window.getWindowElement());
            window.onClose();

            this.refresh();
            this.reorder();
        }

        public focus(window: Window) {
            if (!this.openWindows.includes(window))
                throw new Error("Can't focus requested window because it does not exist in the set of open windows");

            const index = this.openWindows.indexOf(window);
            this.openWindows.splice(index, 1);

            this.openWindows.unshift(window);
            this.reorder();
        }

        reorder() {
            if (this.openWindows.length === 0)
                return;

            this.openWindows[0].focus();

            for (let i = WindowManager.MAX_Z_INDEX; WindowManager.MAX_Z_INDEX - i < this.openWindows.length; --i) {
                const idx = WindowManager.MAX_Z_INDEX - i;

                if (this.openWindows[idx].showingAbove())
                    continue;

                this.openWindows[idx].getWindowElement().style.zIndex = `${i}`;
                if (i !== WindowManager.MAX_Z_INDEX)
                    this.openWindows[idx].blur();
            }
        }
    }
}