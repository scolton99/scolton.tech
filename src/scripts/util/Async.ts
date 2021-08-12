export default abstract class Async {
  public static waitAtLeast(ms: number, task: Promise<void>): Promise<void> {
    return new Promise<void>(resolve => {
      window.setTimeout(() => {
        void task.then(resolve);
      }, ms);
    });
  }
}
