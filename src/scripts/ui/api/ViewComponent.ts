export default abstract class ViewComponent {
  protected el: HTMLElement;

  protected constructor() {
    this.el = document.getElementById(this.getId());

    if (!this.el) {
      throw new Error(`Couldn't find element #${this.getId()}`);
    }

    this.el.addEventListener('click', (event: MouseEvent) => {
      if (event.target === this.el) {
        this.click(event);
      }
    });
    window.addEventListener('click', (event: MouseEvent) => {
      if (event.target !== this.el) {
        this.clickOff(event);
      }
    });
  }

  public abstract getId(): string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public click(_event: MouseEvent): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public clickOff(_event: MouseEvent): void {}
}
