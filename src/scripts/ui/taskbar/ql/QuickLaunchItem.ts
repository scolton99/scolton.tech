import Action from '../../../actions/Action.js';

export default abstract class QuickLaunchItem {
    public abstract getAction(): Action;
    public abstract getIcon(): string;

    public getIconCategory(): string {
        return "quick-launch";
    }
}