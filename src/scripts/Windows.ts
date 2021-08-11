/// <reference path="./components/Taskbar.ts" />
/// <reference path="./util/WindowManager.ts" />
/// <reference path="./util/ImagePreloader.ts" />
/// <reference path="./util/Async.ts" />

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

        public static async boot(): Promise<void> {
            await ImagePreloader.all()
        }

        private static showBootSplash() {
            const splash = document.createElement("div");
            splash.classList.add("boot-splash");

            document.body.appendChild(splash);
        }

        private static hideBootSplash() {
            document.body.removeChild(document.querySelector("body > .boot-splash"));
        }

        static async start(): Promise<Windows> {
            Windows.showBootSplash();
            await Async.waitAtLeast(3000, Windows.boot());
            Windows.hideBootSplash();
            return new Windows();
        }

        public wakeup() {
            document.body.removeChild(document.querySelector("body > .dark-shade"));
        }

        public standby() {
            const shade = document.createElement("div");
            shade.classList.add("dark-shade");

            document.body.appendChild(shade);

            window.setTimeout(() => {
                shade.addEventListener("mousemove", this.wakeup.bind(this));
            }, 2000);
        }

        public shutdown() {
            this.windowManager.shutdown();
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("safe-to-turn-off");

            const message = document.createElement("span");
            message.appendChild(document.createTextNode("It's now safe to turn off"));
            message.appendChild(document.createElement("br"));
            message.appendChild(document.createTextNode("your computer."));

            messageContainer.appendChild(message);
            document.body.appendChild(messageContainer);
        }

        public getWindowManager() {
            return this.windowManager;
        }
    }
}
