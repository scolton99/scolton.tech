import QuickLaunchItem from './QuickLaunchItem.js';
import NewWindowItem from './NewWindowItem.js';
import ShowDesktopItem from './ShowDesktopItem.js';

export type QuickLaunchItemRegistration = {
    new (params?: { [prop: string]: string }): QuickLaunchItem;
    getName(): string;
};

export default abstract class QuickLaunchRegistry {
    private static readonly registry: Map<string, QuickLaunchItemRegistration> = new Map<string, QuickLaunchItemRegistration>();
    private static readonly types: Array<QuickLaunchItemRegistration> = [
        NewWindowItem,
        ShowDesktopItem
    ];

    public static registerAll(): void {
        for (const type of QuickLaunchRegistry.types)
            QuickLaunchRegistry.registry.set(type.getName(), type);
    }

    public static getRegistration(name: string): QuickLaunchItemRegistration {
        return QuickLaunchRegistry.registry.get(name);
    }
}