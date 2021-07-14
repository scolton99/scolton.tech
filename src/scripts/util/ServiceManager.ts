/// <reference path="../Windows.ts" />
/// <reference path="../components/windows/ShutdownWindow.ts" />
/// <reference path="../actions/NewWindowAction.ts" />

namespace Win98 {
    export class ServiceManager {
        private static instance: Windows;

        static initialize(): void {
            ServiceManager.instance = Windows.start();
        }

        static getWindows(): Windows {
            return ServiceManager.instance;
        }
    }
}