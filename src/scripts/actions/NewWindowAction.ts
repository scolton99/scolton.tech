namespace Win98 {
    export class NewWindowAction implements Action {
        private readonly type: new () => Window;

        constructor(window: new () => Window) {
            this.type = window;
        }

        run(): void {
            ServiceManager.getWindows().getWindowManager().open(new this.type);
        }
    }
}