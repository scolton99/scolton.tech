namespace Win98 {
    export class CompoundAction implements Action {
        private readonly actions: Array<Action>;

        public constructor(...actions: Array<Action>) {
            this.actions = actions;
        }

        public run(): void {
            this.actions.forEach(action => action.run());
        }
    }
}