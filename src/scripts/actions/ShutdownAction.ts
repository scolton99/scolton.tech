/// <reference path="../util/ServiceManager.ts" />
/// <reference path="./Action.ts" />

namespace Win98 {
    export class ShutdownAction implements Action {
        run(): void {
            ServiceManager.getWindows().shutdown();
        }
    }
}