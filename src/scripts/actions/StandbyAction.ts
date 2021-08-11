namespace Win98 {
    export class StandbyAction implements Action {
        public run(): void {
            ServiceManager.getWindows().standby();
        }
    }
}