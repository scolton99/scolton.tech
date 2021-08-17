import Action from './Action.js';
import ServiceManager from '../service/ServiceManager.js';

export default class ShowDesktopAction implements Action {
    public run(): void {
        ServiceManager.getWindowManager().showDesktop();
    }
}