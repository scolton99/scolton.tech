/// <reference path="../../util/DOMComponent.ts" />
/// <reference path="./StartMenu.ts" />

namespace Win98 {
    export class StartButton extends DOMComponent {
        private readonly menu: StartMenu;

        constructor() {
            super();

            this.menu = new StartMenu(this);
        }

        getId() {
            return "start-button";
        }

        click(event) {
            if (event.target !== this.el) {
                console.log("Clicked on a descendant of start button -- not triggering event");
                return;
            }

            this.el.classList.toggle("active");

            if (this.el.classList.contains("active"))
                this.menu.open();
            else
                this.menu.close();
        }

        clickOff(event) {
            if (this.el.contains(event.target)) {
                console.log("Clicked on a descendant of start button -- not triggering event");
                return;
            }

            this.unclick();
            this.menu.close();
        }

        unclick() {
            this.el.classList.remove("active");
        }

        isClicked() {
            return this.el.classList.contains("active");
        }
    }
}