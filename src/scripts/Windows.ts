/// <reference path="./components/Taskbar.ts" />
/// <reference path="./util/WindowManager.ts" />

namespace Win98 {
    export class Windows {
        private readonly taskbar: Taskbar;
        private readonly windowManager: WindowManager;

        private constructor() {
            window.addEventListener("selectstart", event => {
                event.preventDefault();
                return false;
            });

            this.windowManager = new WindowManager();
            this.taskbar = new Taskbar(this.windowManager);
        }

        static start(): Windows {
            return new Windows();
        }

        public shutdown() {
            console.warn("Not implemented");
        }

        public getWindowManager() {
            return this.windowManager;
        }
    }
}
