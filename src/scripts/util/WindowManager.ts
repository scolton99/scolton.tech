/// <reference path="../components/Window.ts" />

namespace Win98 {
    export interface WindowSize {
        height: number,
        width: number
    }

    export class WindowManager {
        private static readonly MAX_Z_INDEX: number = 10_000;
        private static readonly WINDOWS_CONTAINER_ID = "open-windows";
        private readonly el: HTMLElement;

        private lastWindowSize: WindowSize;

        private openWindows: Array<Window> = [];
        private callbacks: Array<Function> = [];

        public register(cb: Function) {
            this.callbacks.push(cb);
        }

        public constructor() {
            this.el = document.getElementById(WindowManager.WINDOWS_CONTAINER_ID);

            this.lastWindowSize = {
                height: window.innerHeight,
                width: window.innerWidth
            };

            window.addEventListener('resize', this.resizeDesktop.bind(this));

            if (!this.el)
                throw new Error(`Couldn't find element #${WindowManager.WINDOWS_CONTAINER_ID} to hold open windows`);
        }

        public refresh() {
            this.callbacks.forEach(it => it.call(null, this.openWindows));
        }

        public shutdown() {
            this.openWindows.forEach(this.close.bind(this));
        }

        public open(window: Window) {
            this.openWindows.unshift(window);
            console.log(`Open windows: ${this.openWindows}`)

            this.el.appendChild(window.getSurroundingWindowElement());
            window.onDisplay();

            this.refresh();
            this.reorder();
        }

        public close(window: Window): void {
            if (!this.openWindows.includes(window))
                return;

            this.openWindows.splice(this.openWindows.indexOf(window), 1);
            this.el.removeChild(window.getSurroundingWindowElement());
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
                const currentWindow = this.openWindows[idx];

                if (currentWindow.showingAbove()) {
                    currentWindow.setZIndex(WindowManager.MAX_Z_INDEX * 2);
                } else {
                    currentWindow.setZIndex(i);
                    if (i !== WindowManager.MAX_Z_INDEX)
                        currentWindow.blur();
                }
            }
        }

        resizeDesktop() {
            const newSize = { width: window.innerWidth, height: window.innerHeight };
            this.openWindows.forEach(it => it.resizeDesktop(this.lastWindowSize, newSize));
            this.lastWindowSize = newSize;
        }
    }
}