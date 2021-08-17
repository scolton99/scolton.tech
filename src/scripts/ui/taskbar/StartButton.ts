import ViewComponent from '../api/ViewComponent.js';
import StartMenu from './StartMenu.js';

export default class StartButton extends ViewComponent {
  private readonly menu: StartMenu;

  public constructor() {
    super();

    this.menu = new StartMenu(this);
  }

  public getId(): string {
    return 'start-button';
  }

  /**
   * @override
   * @param event
   */
  public click(event: MouseEvent): void {
    if (event.target !== this.el)
      return;

    this.el.classList.toggle('active');

    if (this.el.classList.contains('active'))
      this.menu.open();
    else
      this.menu.close();
  }

  public clickOff(event: MouseEvent): void {
    if (this.el.contains(event.target as Node))
      return;

    this.unclick();
    this.menu.close();
  }

  public unclick(): void {
    this.el.classList.remove('active');
  }

}