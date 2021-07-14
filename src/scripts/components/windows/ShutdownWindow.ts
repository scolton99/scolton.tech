/// <reference path="../../actions/RestartAction.ts" />
/// <reference path="../../actions/ShutdownAction.ts" />
/// <reference path="../elements/RadioButtons.ts" />

namespace Win98 {
    export class ShutdownWindow extends Window {
        private shade: HTMLElement;

        private static readonly actions: Array<RadioButton> = [
            { name: "Shut Down" },
            { name: "Restart" }
        ];

        public constructor() {
            super("Shut Down Windows", CloseButtons.CLOSE_ONLY);

            const content = document.createElement("div");
            content.style.minWidth = "300px";
            content.style.display = "flex";
            content.style.boxSizing = "border-box";
            content.style.padding = "16px";
            content.style.fontSize = "11px";

            const left = document.createElement("div");
            const icon = document.createElement("img");
            icon.src = `/static/assets/images/windows/shutdown.png`;
            left.appendChild(icon);

            content.appendChild(left);

            const right = document.createElement("div");
            const helpText = document.createElement("p");
            helpText.textContent = "What do you want the computer to do?";
            helpText.style.marginTop = "0";
            helpText.style.marginBottom = "12px";

            right.appendChild(helpText);

            const form = document.createElement("form");
            form.action = "javascript:void(0);";

            const radioButtons = new RadioButtons(ShutdownWindow.actions);
            form.appendChild(radioButtons.getRootDOMElement());

            const buttons = document.createElement("div");
            buttons.style.display = "flex";
            buttons.style.marginTop = "12px";
            buttons.style.justifyContent = "space-between";
            buttons.style.columnGap = "6px";

            const ok = document.createElement("button");
            ok.classList.add("button");
            ok.classList.add("border-primary");
            ok.textContent = "OK";
            ok.style.flex = "1";
            ok.style.width = "33%";
            ok.addEventListener("click", () => {
                const selected: HTMLInputElement = Array.from(form.querySelectorAll("[name='poweroptions']")).find(it => (it as HTMLInputElement).checked) as HTMLInputElement;
                if (!selected)
                    return;

                switch (selected.value) {
                    case "shut-down": {
                        new ShutdownAction().run();
                        break;
                    }
                    case "restart": {
                        new RestartAction().run();
                    }
                }
            })

            const cancel = document.createElement("button");
            cancel.classList.add("button");
            cancel.textContent = "Cancel";
            cancel.style.flex = "1";
            cancel.style.width = "33%";
            const action = new CloseWindowAction(this);
            cancel.addEventListener("click", action.run.bind(action));

            const help = document.createElement("button");
            help.classList.add("button");
            help.textContent = "Help";
            help.style.flex = "1"
            help.style.width = "33%";

            buttons.appendChild(ok);
            buttons.appendChild(cancel);
            buttons.appendChild(help);

            form.appendChild(buttons);

            right.appendChild(form);

            right.style.paddingLeft = "16px";

            content.appendChild(left);
            content.appendChild(right);

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