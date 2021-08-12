import DOMComponent from '../api/DOMComponent.js';
import StartButton from './StartButton.js';
import MenuEntry from './MenuEntry.js';
import NewWindowAction from '../../actions/NewWindowAction.js';
import LogOffWindow from '../windows/LogOffWindow.js';
import ShutdownWindow from '../windows/ShutdownWindow.js';
import Resources from '../util/Resources.js';

export default class StartMenu extends DOMComponent {
  private readonly animationTime: number = 125;
  private readonly startButton: StartButton;

  private readonly menuEntries: Array<Array<MenuEntry>> = [
    [
      new MenuEntry('Windows Update', 'wupdate', null)
    ],
    [
      new MenuEntry('Programs', 'programs', null),
      new MenuEntry('Favorites', 'favorites', null),
      new MenuEntry('Documents', 'documents', null),
      new MenuEntry('Settings', 'settings', null),
      new MenuEntry('Find', 'find', null),
      new MenuEntry('Help', 'help', null),
      new MenuEntry('Run...', 'run', null)
    ],
    [
      new MenuEntry('Log Off User...', 'logoff', new NewWindowAction(LogOffWindow)),
      new MenuEntry('Shut Down...', 'poweroptions', new NewWindowAction(ShutdownWindow))
    ]
  ];

  public constructor(button: StartButton) {
    super();

    this.startButton = button;

    const inner = document.createElement('div');
    inner.id    = 'start-menu-inner';

    this.el.appendChild(inner);
    this.populate();
  }

  private populate(): void {
    const content = this.getInner();

    for (let i = 0; i < this.menuEntries.length; ++i) {
      const list = document.createElement('ul');

      for (const entry of this.menuEntries[i])
        list.appendChild(this.renderEntry(entry));

      content.appendChild(list);

      if (i + 1 < this.menuEntries.length) {
        const separator = document.createElement('hr');
        content.appendChild(separator);
      }
    }
  }

  public getId(): string {
    return 'start-menu';
  }

  public open(): void {
    if (this.el.classList.contains('active'))
      return;

    this.el.classList.add('active');

    this.animateOpen();
  }

  public close(): void {
    if (!this.el.classList.contains('active'))
      return;

    this.el.style.height = '0';
    this.el.classList.remove('active');

    this.startButton.unclick();
  }

  private renderEntry(entry: MenuEntry): HTMLElement {
    const item                 = document.createElement('li');
    item.style.backgroundImage = Resources.getCSSCategoricalImage('start-menu', entry.getIconName());
    item.textContent           = entry.getTitle();
    if (entry.getAction() !== null) {
      item.addEventListener('click', () => {
        entry.getAction().run();
        this.close();
      });
    }

    return item;
  }

  private getInner() {
    return this.el.querySelector('#start-menu-inner');
  }

  private calculateHeight(): number {
    return this.el.firstElementChild.scrollHeight + 2;
  }

  private animateOpen(callback: (() => void) | null = null) {
    const finalHeight: number = this.calculateHeight();
    const startTime           = performance.now();

    const calculator = () => {
      const delta = performance.now() - startTime;

      if (delta > this.animationTime) {
        this.el.style.height = `${finalHeight}px`;
        if (callback)
          callback();
        return;
      }

      const pct            = (delta / this.animationTime);
      this.el.style.height = `${pct * finalHeight}px`;

      window.requestAnimationFrame(calculator);
    };

    window.requestAnimationFrame(calculator);
  }
}