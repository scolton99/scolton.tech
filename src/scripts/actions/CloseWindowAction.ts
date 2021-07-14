namespace Win98 {
    export class CloseWindowAction implements Action {
        private readonly window: Window;

        public constructor(window: Window) {
            this.window = window;
        }

        public run(): void {
            ServiceManager.getWindows().getWindowManager().close(this.window);
        }
    }
}