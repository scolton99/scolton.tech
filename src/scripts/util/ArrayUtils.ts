namespace Win98 {
    export abstract class ArrayUtils {
        public static remove(array: Array<any>, item): void {
            if (!array.includes(item))
                return;

            array.splice(array.indexOf(item), 1);
        }
    }
}