/// <reference path="./StartButton.ts" />
/// <reference path="../../actions/Action.ts" />
/// <reference path="./MenuEntry.ts" />
/// <reference path="../../util/Resources.ts" />

namespace Win98 {
    enum AnimationDirection {
        OPEN,
        CLOSE
    }

    export class StartMenu extends DOMComponent {
        private readonly ANIMATION_TIME: number = 125;
        private readonly startButton: StartButton;

        private menuEntries: Array<Array<MenuEntry>> = [
            [
                new MenuEntry("Windows Update", "wupdate", null)
            ],
            [
                new MenuEntry("Programs", "programs", null),
                new MenuEntry("Favorites", "favorites", null),
                new MenuEntry("Documents", "documents", null),
                new MenuEntry("Settings", "settings", null),
                new MenuEntry("Find", "find", null),
                new MenuEntry("Help", "help", null),
                new MenuEntry("Run...", "run", null),
            ],
            [
                new MenuEntry("Log Off User...", "logoff", null),
                new MenuEntry("Shut Down...", "poweroptions", new NewWindowAction(ShutdownWindow))
            ]
        ];

        public constructor(button: StartButton) {
            super();

            this.startButton = button;

            const inner = document.createElement("div");
            inner.id = "start-menu-inner";

            this.el.appendChild(inner);
            this.populate();
        }

        private renderEntry(entry: MenuEntry): HTMLElement {
            const item = document.createElement("li");
            item.style.backgroundImage = Resources.getCSSCategoricalImage('start-menu', entry.getIconName());
            item.textContent = entry.getTitle();
            if (entry.getAction() !== null) {
                item.addEventListener("click", () => {
                    entry.getAction().run();
                    this.close();
                });
            }

            return item;
        }

        populate() {
            const content = this.getInner();

            for (let i = 0; i < this.menuEntries.length; ++i) {
                const list = document.createElement("ul");

                for (const entry of this.menuEntries[i])
                    list.appendChild(this.renderEntry(entry));

                content.appendChild(list);

                if (i + 1 < this.menuEntries.length) {
                    const separator = document.createElement("hr");
                    content.appendChild(separator);
                }
            }
        }

        private getInner() {
            return this.el.querySelector("#start-menu-inner");
        }

        getId() {
            return "start-menu";
        }

        private calculateHeight(): number {
            return this.el.firstElementChild.scrollHeight + 2;
        }

        private animateHeight(direction: AnimationDirection, callback: () => void = () => {}) {
            const finalHeight: number = direction == AnimationDirection.OPEN ? this.calculateHeight() : 0;
            const startTime = performance.now();

            const calculator = () => {
                const delta = performance.now() - startTime;

                if (delta > this.ANIMATION_TIME) {
                    this.el.style.height = `${finalHeight}px`;
                    callback();
                    return;
                }

                const pct = (delta / this.ANIMATION_TIME);
                this.el.style.height = `${pct * finalHeight}px`;

                window.requestAnimationFrame(calculator);
            };

            window.requestAnimationFrame(calculator);
        }

        public open() {
            if (this.el.classList.contains("active"))
                return;

            this.el.classList.add("active");

            this.animateHeight(AnimationDirection.OPEN);
        }

        public close() {
            if (!this.el.classList.contains("active"))
                return;

            this.el.style.height = "0";
            this.el.classList.remove("active");

            this.startButton.unclick();
        }

        public toggle() {
            if (this.el.classList.contains("active")) {
                this.close();
            } else {
                this.open();
            }
        }
    }
}