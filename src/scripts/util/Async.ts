export default abstract class Async {
  public static waitAtLeast(ms: number, task: Promise<void>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      task.catch(reject);
      window.setTimeout(() => {
        void task.then(resolve);
      }, ms);
    });
  }
}
