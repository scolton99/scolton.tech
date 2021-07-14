/// <reference path="UIElement.ts" />
/// <reference path="../../util/UUID.ts" />
/// <reference path="../../util/ArrayUtils.ts" />

namespace Win98 {
    export interface RadioButton {
        name: string,
        value?: string
    }

    enum RadioButtonsOrientation {
        VERTICAL = "radio-buttons-vert",
        HORIZONTAL = "radio-buttons-horiz"
    }

    export class RadioButtons extends UIElement {
        private readonly name: string;
        private orientation: RadioButtonsOrientation;

        private readonly items: Array<RadioButton>;
        private domElements: Map<RadioButton, HTMLInputElement> = new Map<RadioButton, HTMLInputElement>();

        public constructor(items: Array<RadioButton>, orientation: RadioButtonsOrientation = RadioButtonsOrientation.VERTICAL) {
            super();

            this.name = UUID.generate();
            this.items = items.map(RadioButtons.assumeValue);

            this.setOrientation(orientation);

            this.items.forEach(item => {
                const domElement: HTMLInputElement = this.makeItem(item);

                this.domElements.set(item, domElement);
                this.appendDOMElement(RadioButtons.addLabel(item, domElement));
            });
        }

        private static assumeValue(item: RadioButton): RadioButton {
            if (item.value) return item;

            return {
                ...item,
                value: item.name.replace(/\s/g, '-').toLowerCase()
            };
        }

        private static addLabel(item: RadioButton, domItem: HTMLInputElement): HTMLElement {
            const label = document.createElement("label");
            label.htmlFor = domItem.id;
            label.textContent = item.name;

            const container = document.createElement("div");
            container.classList.add("radio-button-group");
            container.appendChild(domItem);
            container.appendChild(label);

            return container;
        }

        private makeItem(item: RadioButton): HTMLInputElement {
            const domItem = document.createElement("input");
            domItem.type = "radio";
            domItem.name = this.name;
            domItem.value = item.value;
            domItem.id = UUID.generate();

            return domItem;
        }

        public getItems(): Array<RadioButton> {
            return this.items;
        }

        public removeItem(item: RadioButton): void {
            if (!this.items.includes(item) && !this.domElements.has(item)) {
                return;
            } else if (!this.items.includes(item) || !this.domElements.has(item)) {
                console.warn(`RadioButtons ${this.name} in inconsistent state`);
                return;
            }

            const domElement = this.domElements.get(item);
            const container = domElement.parentElement;

            container.parentElement.removeChild(container);

            this.domElements.delete(item);
            ArrayUtils.remove(this.items, item);
        }

        // TODO: Don't like that this doesn't error upon no item with given name
        public removeItemByName(name: string): void {
            const item = this.items.find(item => item.name === name);
            if (!item)
                return;

            this.removeItem(item);
        }

        public getValue(): string {
            const selectedElement = Array.from(this.domElements.values()).find(it => it.checked);
            if (!selectedElement)
                return null;

            return selectedElement.value;
        }

        public setValue(value: string): void {
            const toSelect = this.items.find(item => item.value === value);
            if (!toSelect)
                return;

            this.domElements.get(toSelect).checked = true;
        }

        public setOrientation(orientation: RadioButtonsOrientation): void {
            this.getRootDOMElement().classList.remove(this.orientation);
            this.getRootDOMElement().classList.add(orientation);
            this.orientation = orientation;
        }
    }
}