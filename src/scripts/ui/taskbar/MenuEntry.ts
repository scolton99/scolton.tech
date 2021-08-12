import Action from '../../actions/Action.js';

export default class MenuEntry {
  private readonly iconName: string;
  private readonly title: string;
  private readonly action: Action;

  public constructor(title: string, iconName: string, action: Action) {
    this.title    = title;
    this.iconName = iconName;
    this.action   = action;
  }

  public getIconName(): string {
    return this.iconName;
  }

  public getTitle(): string {
    return this.title;
  }

  public getAction(): Action {
    return this.action;
  }
}