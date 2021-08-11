namespace Win98 {
    export abstract class Async {
        public static wait(ms: number): Promise<void> {
            return new Promise<void>(resolve => {
                window.setTimeout(resolve, ms);
            });
        }

        public static waitAtLeast(ms: number, task: Promise<any>) {
            return new Promise<void>(resolve => {
                window.setTimeout(() => {
                    task.then(resolve);
                }, ms);
            });
        }
    }
}