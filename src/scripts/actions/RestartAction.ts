import Action from './Action.js';

export default class RestartAction implements Action {
  public run(): void {
    location.reload();
  }
}