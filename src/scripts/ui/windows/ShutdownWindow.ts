import ShadeWindow from './api/ShadeWindow.js';
import RadioButtons, { RadioButton, RadioButtonsOrientation } from './elements/RadioButtons.js';
import StandbyAction from '../../actions/StandbyAction.js';
import ShutdownAction from '../../actions/ShutdownAction.js';
import RestartAction from '../../actions/RestartAction.js';
import { CloseButtons } from './api/Window.js';
import Pane from './elements/Pane.js';
import Icon from './elements/Icon.js';
import Label from './elements/Label.js';
import Button from './elements/Button.js';
import CompoundAction from '../../actions/CompoundAction.js';
import CloseWindowAction from '../../actions/CloseWindowAction.js';
import ButtonSet from './elements/ButtonSet.js';
import { WindowSize } from '../../system/WindowManager.js';
import ServiceManager from '../../service/ServiceManager.js';

export default class ShutdownWindow extends ShadeWindow {
  private static readonly LAST_SELECTION_KEY = 'shutdown-window-default-selection';
  private static readonly actions: Array<RadioButton> = [
    { name: 'Stand by', value: 'stand-by', action: new StandbyAction() },
    { name: 'Shut down', value: 'shut-down', action: new ShutdownAction() },
    { name: 'Restart', value: 'restart', action: new RestartAction() }
  ];
  private readonly radioButtons: RadioButtons;

  public constructor() {
    super('Shut Down Windows', CloseButtons.CLOSE_ONLY);

    const content      = new Pane('flex', 'padding-top-10', 'padding-horiz-6');
    const leftContent  = new Pane('fixed-size', 'padding-right-8');
    const rightContent = new Pane();

    leftContent.append(new Icon('shutdown'));

    rightContent.append(new Label('What do you want the computer to do?', 'margin-bottom-8'));

    ShutdownWindow.actions.forEach(action => {
      const last = ServiceManager.getSession().get(ShutdownWindow.LAST_SELECTION_KEY, 'shut-down');

      action.default = last === action.value;
    });

    this.radioButtons = new RadioButtons(ShutdownWindow.actions, RadioButtonsOrientation.VERTICAL, ['margin-bottom-2'], 'margin-bottom-8');
    rightContent.append(this.radioButtons);

    this.radioButtons.addChangeListener(newValue => {
      ServiceManager.getSession().set(ShutdownWindow.LAST_SELECTION_KEY, newValue);
    });

    const buttons = [
      new Button('OK', new CompoundAction(new CloseWindowAction(this), this.radioButtons.action())),
      new Button('Cancel', new CloseWindowAction(this)),
      new Button('Help')
    ];

    rightContent.append(new ButtonSet(buttons, [], 'equal-size', 'gap-3', 'margin-bottom-8'));

    content.append(leftContent);
    content.append(rightContent);

    this.registerContent(content);
  }

  /**
   * @override
   * @param oldSize
   */
  public resizeDesktop(oldSize: WindowSize): void {
    super.resizeDesktop(oldSize);

    this.fitContent();
    this.center();
  }

  public onDisplay(): void {
    this.center();
    this.showShade();
    this.fitContent();
  }

  public onClose(): void {
    this.hideShade();
  }

  public getIconName(): string {
    return null;
  }

  public showingAbove(): boolean {
    return true;
  }

  public shouldAppearOnTaskbar(): boolean {
    return false;
  }

  public draggable(): boolean {
    return false;
  }

  public static getWindowClassName(): string {
    return "shut-down";
  }

  public static getDefaultIconName(): string {
    return null;
  }
}
