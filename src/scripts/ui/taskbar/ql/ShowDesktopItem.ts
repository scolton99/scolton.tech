import QuickLaunchItem from "./QuickLaunchItem.js";
import ShowDesktopAction from '../../../actions/ShowDesktopAction.js';
import Action from '../../../actions/Action.js';

export default class ShowDesktopItem extends QuickLaunchItem {
    public getAction(): Action {
        return new ShowDesktopAction();
    }

    public getIcon(): string {
        return "show-desktop";
    }

    public static getName(): string {
        return "show-desktop";
    }

}