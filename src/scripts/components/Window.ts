/// <reference path="../util/MouseCoords.ts" />
/// <reference path="../util/FixedPosition.ts" />
/// <reference path="../actions/CloseWindowAction.ts" />
/// <reference path="../util/HTMLCompatible.ts" />
/// <reference path="./elements/UIElement.ts" />
/// <reference path="../util/Resources.ts" />


namespace Win98 {
    /**
     * Types of window titlebar buttons that may exist.
     */
    export enum CloseButtons {
        CLOSE_ONLY = "close-only",
        CLOSE_RESTORE_MAX_MIN = "close-restore-max-min"
    }

    /**
     * The base class for all windows on the system.
     */
    export abstract class Window implements HTMLCompatible {
        /**
         * Constant for the CSS class name for window content.
         * Cannot and should not be overridden.
         *
         * @private
         */
        private static readonly CONTENT_CLASS = "window-content";

        /**
         * The title of the window. Displays on the titlebar.
         *
         * @protected
         */
        protected readonly title: string;

        /**
         * DOM element containing the window's content. This does not include the titlebar.
         * Contained by the `windowElement`.
         *
         * @protected
         */
        protected contentElement: HTMLElement;

        /**
         * DOM element surrounding the window for aspects of window rendering that take place outside the window.
         *
         * @protected
         */
        protected surroundingWindowElement: HTMLElement;

        /**
         * DOM element containing the titlebar, other aspects of the window itself, and the window's content.
         *
         * @private
         */
        protected windowElement: HTMLElement;

        /**
         * Creates a new window to be displayed. This constructor should be called by all implementing subclasses.
         *
         * @param title - The title of this window, for the titlebar.
         * @param type - The type of buttons this window should have on the titlebar.
         * @protected
         */
        protected constructor(title: string, type: CloseButtons) {
            this.title = title;

            // Create the outermost window DOM element
            this.windowElement = document.createElement("div");
            this.surroundingWindowElement = this.windowElement;
            this.windowElement.classList.add("window");

            // Create the titlebar
            const titlebar = document.createElement("div");
            titlebar.classList.add("titlebar");
            titlebar.classList.add(type);

            // Load the icon
            const iconName = this.getIconName();
            if (iconName !== null) {
                titlebar.style.backgroundImage = Resources.getCSSCategoricalImage('window-icons', this.getIconName());
            } else {
                titlebar.classList.add("no-icon");
            }

            // Container for close buttons
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

        /**
         * Handles the window being dragged by its titlebar.
         *
         * @param event - The `MouseEvent` resulting from the initial mouse down.
         */
        public drag(event: MouseEvent): void {
            const origMousePos: MouseCoords = new MouseCoords(event.x, event.y);
            const origWindowPos: FixedPosition = this.getPosition();

            const handleMove: (MouseEvent) => void = (event: MouseEvent) => {
                const delta: { deltaX, deltaY } = origMousePos.calculateDelta(new MouseCoords(event.x, event.y));
                this.shiftRelative(delta.deltaX, delta.deltaY, origWindowPos);
            };
            window.addEventListener("mousemove", handleMove);

            const removeListeners: (MouseEvent) => void = () => {
                window.removeEventListener("mousemove", handleMove);
                window.removeEventListener("mouseup", removeListeners);
            };
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

        public getSurroundingWindowElement(): HTMLElement {
            return this.surroundingWindowElement;
        }

        protected setSurroundingWindowElement(element: HTMLElement) {
            while (element.firstElementChild)
                element.removeChild(element.firstElementChild);

            element.appendChild(this.windowElement);
            this.surroundingWindowElement = element;
        }

        /**
         * Determines whether this window should appear on the taskbar.
         */
        public shouldAppearOnTaskbar(): boolean {
            return true;
        };

        protected registerContent(content: UIElement) {
            this.registerHTMLContent(content.getRootDOMElement());
        }

        /**
         * Sets this window's content as a DOM element.
         *
         * @param content
         * @private
         */
        private registerHTMLContent(content: HTMLElement): void {
            this.contentElement = content;
            this.contentElement.classList.add(Window.CONTENT_CLASS);

            const existingContent = Array.from(this.windowElement.querySelectorAll(`.${Window.CONTENT_CLASS}`));
            for (const existingChild of existingContent)
                this.windowElement.removeChild(existingChild);

            this.windowElement.appendChild(this.contentElement);
        }

        /**
         * Computes the width of this window in pixels.
         */
        public getWidth(): number {
            const pos = this.getPosition();

            return window.innerWidth - pos.right - pos.left;
        }

        /**
         * Computes the height of this window in pixels.
         */
        public getHeight(): number {
            const pos = this.getPosition();

            return window.innerHeight - pos.top - pos.bottom;
        }

        /**
         * Centers this window vertically and horizontally on the screen.
         *
         * @param shouldIgnoreTaskbar - If the height of the taskbar should be taken into account in centering.
         */
        public center(shouldIgnoreTaskbar: boolean = true): void {
            const width = this.getWidth();
            const height = this.getHeight();

            const sigma = shouldIgnoreTaskbar ? 28.0 : 0.0;

            const horiz = (window.innerWidth - width) / 2.0;
            const vert = (window.innerHeight - height) / 2.0;

            this.setPosition(new FixedPosition(vert - (sigma / 2.0), horiz < 0 ? 2 * horiz : horiz, vert + (sigma / 2.0), horiz < 0 ? 0 : horiz));
        }

        /**
         * Returns this window's current position on screen in the form of a CSS inset.
         */
        public getPosition(): FixedPosition {
            const computedStyles = getComputedStyle(this.windowElement);

            const distanceMetrics = ["top", "bottom", "left", "right"];
            const numericValues: { [index: string]: number } = {};
            distanceMetrics.forEach(it => {
                numericValues[it] = DOMUtils.fromUnits(computedStyles[it]);
            });

            return new FixedPosition(numericValues.top, numericValues.right, numericValues.bottom, numericValues.left);
        }

        /**
         * Shifts the window to a new position relative to a given starting position.
         *
         * @param deltaX - The horizontal shift given typical CSS axes.
         * @param deltaY - The vertical shift given typical CSS axes.
         * @param startingPosition - The starting position of the window.
         */
        public shiftRelative(deltaX: number, deltaY: number, startingPosition: FixedPosition) {
            const newPosition = new FixedPosition(
                startingPosition.top + deltaY,
                startingPosition.right - deltaX,
                startingPosition.bottom - deltaY,
                startingPosition.left + deltaX
            );

            this.setPosition(newPosition);
        }

        /**
         * Shift the window to a new position from its current position.
         *
         * @param deltaX - The horizontal shift given typical CSS axes.
         * @param deltaY - The vertical shift given typical CSS axes.
         */
        public shift(deltaX: number, deltaY: number): void {
            const starting: FixedPosition = this.getPosition();
            this.shiftRelative(deltaX, deltaY, starting);
        }

        /**
         * Set the window to a new position on screen (CSS inset format).
         *
         * @param position - The new position for the window.
         */
        public setPosition(position: FixedPosition): void {
            const domElement: HTMLElement = this.windowElement;

            domElement.style.top = position.getTop();
            domElement.style.right = position.getRight();
            domElement.style.bottom = position.getBottom();
            domElement.style.left = position.getLeft();
        }

        /**
         * Set the window's height in pixels.
         *
         * @param height - The new height in pixels.
         */
        public setHeight(height: number): void {
            const el = this.windowElement;
            const pos = this.getPosition();

            el.style.bottom = `${window.innerHeight - (pos.top + height)}px`;
        }

        /**
         * Set the window's width in pixels.
         *
         * @param width - The new width in pixels.
         */
        public setWidth(width: number): void {
            const el = this.windowElement;
            const pos = this.getPosition();

            el.style.right = `${window.innerWidth - (pos.left + width)}px`;
        }

        /**
         * Set this window's height and width based on the size of its content.
         *
         * @protected
         */
        protected fitContent() {
            const position = this.getPosition();

            const el = this.getContentElement();
            this.setPosition(new FixedPosition(position.top, null, null, position.left));

            const height = el.scrollHeight;
            const width = el.scrollWidth;

            console.log(`Height: ${height}, width: ${width}`);

            this.setHeight(height + 23);
            this.setWidth(width + 6);
        }

        /**
         * Returns the name of the icon to appear on the titlebar.
         */
        public abstract getIconName(): string;

        /**
         * Empty callback for when the window is rendered on the screen after instantiation.
         */
        public onDisplay(): void { }

        /**
         * Empty callback for when the window is closed by the user or OS (to perform cleanup).
         */
        public onClose(): void { }

        /**
         * If the window should currently be showing above all other windows.
         */
        public showingAbove(): boolean {
            return false;
        }

        /**
         * If the window is resizeable by dragging the edges.
         */
        public resizeable(): boolean {
            return true;
        }

        /**
         * If the window can be moved on screen by dragging it.
         */
        public draggable(): boolean {
            return true;
        }

        /**
         * Adds styling to the window for when it becomes active.
         */
        focus() {
            this.windowElement.classList.add("active");
        }

        /**
         * Adds styling to the window for when it becomes inactive.
         */
        blur() {
            this.windowElement.classList.remove("active");
        }

        /**
         * Adds a new `UIElement` to this window's content.
         *
         * @param child - The new content to be appended after the existing content.
         */
        public append(child: UIElement) {
            this.getContentElement().appendChild(child.getRootDOMElement());
        }

        /**
         * Sets the z-Index of the window.
         *
         * @param zIndex - The new z-Index
         */
        public setZIndex(zIndex: number) {
            this.getSurroundingWindowElement().style.zIndex = `${zIndex}`;
        }

        /**
         * Gets the z-Index of the window.
         */
        public getZIndex(): number {
            return parseInt(this.getSurroundingWindowElement().style.zIndex);
        }

        private getOldDimensions(oldDesktopSize: WindowSize): WindowSize {
            const dims = this.getPosition();

            const height = (oldDesktopSize.height - dims.bottom) - dims.top;
            const width = (oldDesktopSize.width - dims.right) - dims.left;

            return { width, height };
        }

        private keepOnScreen(): void {
            const dims = this.getPosition();

            let newTop = dims.top, newRight = dims.right, newLeft = dims.left, newBottom = dims.bottom;
            const width = this.getWidth();
            const height = this.getHeight();

            if (newRight < 0) {
                newRight = 0;
                newLeft = window.innerWidth - width;
            }

            if (newLeft < 0) {
                newLeft = 0;
                newRight = window.innerWidth - width;
            }

            if (newBottom < 0) {
                newBottom = 0;
                newTop = window.innerHeight - height;
            }

            if (newTop < 0) {
                newTop = 0;
                newBottom = window.innerHeight - height;
            }

            this.setPosition(new FixedPosition(newTop, newRight, newBottom, newLeft));
        }

        public resizeDesktop(oldSize: WindowSize, newSize: WindowSize) {
             const oldDims = this.getOldDimensions(oldSize);

             this.setWidth(oldDims.width);
             this.setHeight(oldDims.height);

             this.keepOnScreen();
        }
    }
}