/// <reference path="../util/MouseCoords.ts" />
/// <reference path="../util/FixedPosition.ts" />
/// <reference path="../actions/CloseWindowAction.ts" />
/// <reference path="../util/HTMLCompatible.ts" />
/// <reference path="./elements/UIElement.ts" />


namespace Win98 {
    export enum CloseButtons {
        CLOSE_ONLY = "close-only",
        CLOSE_RESTORE_MAX_MIN = "close-restore-max-min"
    }

    export abstract class Window implements HTMLCompatible {
        private static readonly CONTENT_CLASS = "window-content";

        protected readonly title: string;
        protected contentElement: HTMLElement;

        private readonly windowElement : HTMLElement;

        protected constructor(title: string, type: CloseButtons) {
            this.title = title;

            this.windowElement = document.createElement("div");
            this.windowElement.classList.add("window");

            const titlebar = document.createElement("div");
            titlebar.classList.add("titlebar");
            titlebar.classList.add(type);

            const iconName = this.getIconName();
            if (iconName !== null) {
                titlebar.style.backgroundImage = `url('/static/assets/images/window-icons/${this.getIconName()}.png')`;
            } else {
                titlebar.classList.add("no-icon");
            }

            const buttons = document.createElement("div");
            buttons.classList.add("buttons");

            const close = document.createElement("div");
            close.classList.add("close");

            close.addEventListener("click", () => {
                new CloseWindowAction(this).run();
            });

            const maxRest = document.createElement("div");
            maxRest.classList.add("max-rest");

            const min = document.createElement("div");
            min.classList.add("min");

            buttons.appendChild(min);
            buttons.appendChild(maxRest);
            buttons.appendChild(close);

            const titleEl = document.createElement("span");
            titleEl.classList.add("title");
            titleEl.textContent = this.getTitle();

            titlebar.appendChild(titleEl);
            titlebar.appendChild(buttons);

            if (this.draggable())
                titlebar.addEventListener("mousedown", this.drag.bind(this));

            this.windowElement.append(titlebar);

            const placeholderContent = document.createElement("div");
            placeholderContent.classList.add(Window.CONTENT_CLASS);

            this.windowElement.append(placeholderContent);
        }

        public drag(event: MouseEvent): void {
            const origMousePos: MouseCoords = new MouseCoords(event.x, event.y);
            const origWindowPos: FixedPosition = this.getPosition();

            const handleMove: (MouseEvent) => void = (event: MouseEvent) => {
                const delta: { deltaX, deltaY } = origMousePos.calculateDelta(new MouseCoords(event.x, event.y));
                this.shiftRelative(delta.deltaX, delta.deltaY, origWindowPos);
            }
            window.addEventListener("mousemove", handleMove);

            const removeListeners: (MouseEvent) => void = (event: MouseEvent) => {
                window.removeEventListener("mousemove", handleMove);
                window.removeEventListener("mouseup", removeListeners);
            }
            window.addEventListener("mouseup", removeListeners);
        }

        public getTitle(): string {
            return this.title;
        }

        public getWindowElement(): HTMLElement {
            return this.windowElement;
        }

        public getContentElement(): HTMLElement {
            return this.contentElement;
        }

        public shouldAppearOnTaskbar(): boolean {
            return true;
        };

        protected registerContent(content: HTMLElement) {
            this.contentElement = content;
            this.contentElement.classList.add(Window.CONTENT_CLASS);

            const existingContent = Array.from(this.windowElement.querySelectorAll(`.${Window.CONTENT_CLASS}`));
            for (const existingChild of existingContent)
                this.windowElement.removeChild(existingChild);

            this.windowElement.appendChild(this.contentElement);
        }

        private static fromUnits(measure: string): number {
            return parseFloat(measure.replace(/[^0-9.]/g, ""));
        }

        public getWidth(): number {
            const pos = this.getPosition();

            return window.innerWidth - pos.right - pos.left;
        }

        public getHeight(): number {
            const pos = this.getPosition();

            return window.innerHeight - pos.top - pos.bottom;
        }

        public center(shouldIgnoreTaskbar: boolean = true): void {
            const width = this.getWidth();
            const height = this.getHeight();

            const sigma = shouldIgnoreTaskbar ? 28.0 : 0.0;

            const horiz = (window.innerWidth - width) / 2.0;
            const vert = (window.innerHeight - height) / 2.0;

            this.setPosition(new FixedPosition(vert - (sigma / 2.0), horiz, vert + (sigma / 2.0), horiz));
        }

        public getPosition(): FixedPosition {
            const computedStyles = getComputedStyle(this.windowElement);

            const distanceMetrics = ["top", "bottom", "left", "right"];
            const numericValues: { [index: string]: number } = {};
            distanceMetrics.forEach(it => {
                numericValues[it] = Window.fromUnits(computedStyles[it]);
            });

            return new FixedPosition(numericValues.top, numericValues.right, numericValues.bottom, numericValues.left);
        }

        public shiftRelative(deltaX: number, deltaY: number, startingPosition: FixedPosition) {
            const newPosition = new FixedPosition(
                startingPosition.top + deltaY,
                startingPosition.right - deltaX,
                startingPosition.bottom - deltaY,
                startingPosition.left + deltaX
            );

            this.setPosition(newPosition);
        }

        public shift(deltaX: number, deltaY: number): void {
            const starting: FixedPosition = this.getPosition();
            this.shiftRelative(deltaX, deltaY, starting);
        }

        public setPosition(position: FixedPosition): void {
            const el = this.windowElement;

            el.style.top = position.getTop();
            el.style.right = position.getRight();
            el.style.bottom = position.getBottom();
            el.style.left = position.getLeft();
        }

        public setHeight(height: number): void {
            const el = this.windowElement;
            const pos = this.getPosition();

            el.style.bottom = `${window.innerHeight - (pos.top + height)}px`;
        }

        public setWidth(width: number): void {
            const el = this.windowElement;
            const pos = this.getPosition();

            el.style.right = `${window.innerWidth - (pos.left + width)}px`;
        }

        protected fitContent() {
            const el = this.getContentElement();

            const height = el.scrollHeight;
            const width = el.scrollWidth;

            console.log(`Height: ${height}, width: ${width}`);

            this.setHeight(height + 23);
            this.setWidth(width + 5);
        }

        public abstract getIconName(): string;
        public onDisplay(): void { }
        public onClose(): void { }
        public showingAbove(): boolean {
            return false;
        }

        public resizeable(): boolean {
            return true;
        }

        public draggable(): boolean {
            return true;
        }

        focus() {
            this.windowElement.classList.add("active");
        }

        blur() {
            this.windowElement.classList.remove("active");
        }

        public append(child: UIElement) {
            this.getContentElement().appendChild(child.getRootDOMElement());
        }
    }
}