/// <reference path="../../actions/RestartAction.ts" />
/// <reference path="../../actions/ShutdownAction.ts" />
/// <reference path="../../actions/StandbyAction.ts" />
/// <reference path="../../util/SessionManager.ts" />
/// <reference path="../elements/RadioButtons.ts" />
/// <reference path="../ShadeWindow.ts" />

namespace Win98 {
    export class ShutdownWindow extends ShadeWindow {
        private static readonly LAST_SELECTION_KEY = 'shutdown-window-default-selection';
        private readonly radioButtons: RadioButtons;

        private static readonly actions: Array<RadioButton> = [
            { name: "Stand by", value: 'stand-by', action: new StandbyAction() },
            { name: "Shut down", value: 'shut-down', action: new ShutdownAction() },
            { name: "Restart", value: 'restart', action: new RestartAction() }
        ];

        public constructor() {
            super("Shut Down Windows", CloseButtons.CLOSE_ONLY)

            const content = new Pane('flex', 'padding-top-10', 'padding-horiz-6');
            const leftContent = new Pane('fixed-size', 'padding-right-8');
            const rightContent = new Pane();

            leftContent.append(new Icon('shutdown'));

            rightContent.append(new Label('What do you want the computer to do?', 'margin-bottom-8'));

            ShutdownWindow.actions.forEach(action => {
                const last = SessionManager.get(ShutdownWindow.LAST_SELECTION_KEY, "shut-down");

                action.default = last === action.value;
            });

            this.radioButtons = new RadioButtons(ShutdownWindow.actions, RadioButtonsOrientation.VERTICAL, ['margin-bottom-2'], 'margin-bottom-8');
            rightContent.append(this.radioButtons);

            this.radioButtons.addChangeListener(newValue => {
                SessionManager.set(ShutdownWindow.LAST_SELECTION_KEY, newValue);
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
         * @param newSize
         */
        resizeDesktop(oldSize: Win98.WindowSize, newSize: Win98.WindowSize) {
            super.resizeDesktop(oldSize, newSize);

            this.fitContent();
            this.center();
        }

        onDisplay() {
            this.center();
            this.showShade();
            this.fitContent();
        }

        onClose() {
            this.hideShade();
        }

        getIconName(): string {
            return null;
        }

        public showingAbove(): boolean {
            return true;
        }

        shouldAppearOnTaskbar(): boolean {
            return false;
        }

        public draggable(): boolean {
            return false;
        }
    }
}