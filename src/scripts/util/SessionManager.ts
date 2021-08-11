namespace Win98 {
    export abstract class SessionManager {
        private static getStorage(): Storage {
            return window.localStorage;
        }

        public static set(key: string, value: string): void {
            SessionManager.getStorage().setItem(key, value);
        }

        public static get(key: string, def: string | null): string | null {
            const storedValue = SessionManager.getStorage().getItem(key);
            return storedValue === null ? def : storedValue;
        }
    }

}