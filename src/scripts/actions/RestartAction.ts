namespace Win98 {
    export class RestartAction implements Action {
        public run(): void {
            location.reload();
        }
    }
}