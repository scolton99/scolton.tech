/// <reference path="../../actions/RestartAction.ts" />
/// <reference path="../../actions/ShutdownAction.ts" />
/// <reference path="../elements/RadioButtons.ts" />

namespace Win98 {
    export class ShutdownWindow extends Window {
        private shade: HTMLElement;
        private readonly radioButtons: RadioButtons;

        private static readonly actions: Array<RadioButton> = [
            { name: "Shut Down" },
            { name: "Restart" }
        ];

        private PowerOptionsAction = class implements Action {
            private readonly outer: ShutdownWindow;

            constructor(outer: ShutdownWindow) {
                this.outer = outer;
            }

            public run(): void {
                const selected = this.outer.radioButtons.getValue();

                console.log(selected);

                if (!selected)
                    return;

                switch (selected) {
                    case "shut-down": {
                        new ShutdownAction().run();
                        break;
                    }
                    case "restart": {
                        new RestartAction().run();
                    }
                }
            }
        }

        public constructor() {
            super("Shut Down Windows", CloseButtons.CLOSE_ONLY)

            const content = new Pane();
            const leftContent = new Pane();
            const rightContent = new Pane();

            leftContent.append(new Icon('shutdown'));

            rightContent.append(new Label('What do you want the computer to do?'));
            this.radioButtons = new RadioButtons(ShutdownWindow.actions);
            rightContent.append(this.radioButtons);

            const buttons = [
                new Button('OK', new this.PowerOptionsAction(this)),
                new Button('Cancel', new CloseWindowAction(this)),
                new Button('Help', null)
            ];

            rightContent.append(new ButtonSet(buttons));

            content.append(leftContent);
            content.append(rightContent);

            this.registerContent(content);
        }

        private showScreenShade() {
            this.shade = document.createElement("div");
            this.shade.classList.add("shade");

            document.body.appendChild(this.shade);
            this.getWindowElement().style.zIndex = '20000';
        }

        private removeScreenShade() {
            document.body.removeChild(this.shade);
        }

        onDisplay() {
            this.center();
            this.showScreenShade();
            this.fitContent();
        }

        onClose() {
            this.removeScreenShade();
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