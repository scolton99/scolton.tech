import ShadeWindow from './api/ShadeWindow.js';
import { CloseButtons } from './api/Window.js';
import Pane from './elements/Pane.js';

export default class LogOffWindow extends ShadeWindow {
  public constructor() {
    super('null', CloseButtons.CLOSE_ONLY);

    const content                            = new Pane();
    content.getRootDOMElement().style.width  = '300px';
    content.getRootDOMElement().style.height = '150px';

    this.registerContent(content);
  }

  public onDisplay(): void {
    super.onDisplay();

    this.fitContent();
    this.center();
  }

  public getIconName(): string {
    return null;
  }

  public static getWindowClassName(): string {
    return "log-off";
  }

  public static getDefaultIconName(): string {
    return null;
  }
}
