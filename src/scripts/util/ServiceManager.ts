/// <reference path="../Windows.ts" />
/// <reference path="../components/windows/ShutdownWindow.ts" />
/// <reference path="../actions/NewWindowAction.ts" />

namespace Win98 {
    export class ServiceManager {
        private static instance: Windows;

        static async initialize(): Promise<void> {
            ServiceManager.instance = await Windows.start();
        }

        static getWindows(): Windows {
            return ServiceManager.instance;
        }
    }
}