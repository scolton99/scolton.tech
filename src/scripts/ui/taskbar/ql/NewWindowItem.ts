import QuickLaunchItem from './QuickLaunchItem.js';
import Action from '../../../actions/Action.js';
import ServiceManager from '../../../service/ServiceManager.js';
import { WindowRegistration } from '../../../system/WindowManager.js';
import NewWindowAction from '../../../actions/NewWindowAction.js';

export default class NewWindowItem extends QuickLaunchItem {
    private readonly windowClass: WindowRegistration;
    private readonly action: NewWindowAction;

    public constructor(params?: { [prop: string]: string }) {
        super();

        if (!params.windowName)
            throw new Error("Must include a window name");

        const windowName: string = params.windowName;
        const windowClass: WindowRegistration = ServiceManager.getWindowManager().getByName(windowName);

        if (!windowClass)
            throw new Error(`Unknown window class: ${windowName}`);

        this.windowClass = windowClass;
        this.action = new NewWindowAction(this.windowClass);
    }

    public static getName(): string {
        return "new-window";
    }

    public getAction(): Action {
        return this.action;
    }

    public getIcon(): string {
        return this.windowClass.getDefaultIconName();
    }
}