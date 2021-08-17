import ViewComponent from '../../api/ViewComponent.js';
import Action from '../../../actions/Action.js';
import ServiceManager from '../../../service/ServiceManager.js';
import QuickLaunchItem from './QuickLaunchItem.js';
import QuickLaunchRegistry, { QuickLaunchItemRegistration } from './QuickLaunchRegistry.js';
import Resources from '../../util/Resources.js';

interface QuickLaunchItemPrototype {
    name: string;
    params?: { [prop: string]: string };
}

export default class QuickLaunch extends ViewComponent {
    private items: Array<QuickLaunchItem>;

    private static renderPrototype(prototype: QuickLaunchItemPrototype): QuickLaunchItem {
        const registration: QuickLaunchItemRegistration = QuickLaunchRegistry.getRegistration(prototype.name);
        return new registration(prototype.params);
    }

    private static renderItem(item: QuickLaunchItem): HTMLElement {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("quick-launch-item");

        itemContainer.style.backgroundImage = Resources.getCSSCategoricalImage(item.getIconCategory(), item.getIcon());

        const action: Action = item.getAction();
        itemContainer.addEventListener("click", action.run.bind(action));

        return itemContainer;
    }

    public constructor() {
        super();

        QuickLaunchRegistry.registerAll();

        for (const item of this.getItems())
            this.el.appendChild(QuickLaunch.renderItem(item));
    }

    public getId(): string {
        return "quick-launch";
    }

    private getItems(): Array<QuickLaunchItem> {
        if (!this.items) {
            const itemPrototypes: Array<QuickLaunchItemPrototype> = ServiceManager.getSession().get("quick-launch-items", [
                {
                    name: "show-desktop"
                },
                {
                    name: "new-window",
                    params: {
                        windowName: "internet-explorer"
                    }
                }
            ]) as unknown as Array<QuickLaunchItemPrototype>;

            this.items = itemPrototypes.map(QuickLaunch.renderPrototype.bind(QuickLaunch));
        }

        return this.items;
    }
}