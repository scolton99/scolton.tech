namespace Win98 {
    export abstract class DOMUtils {
        /**
         * Takes a CSS value with units (e.g., "32px", "86em", "142.3 in") and returns the numeric component. Does not
         * perform any unit conversion.
         *
         * @param measure - The measurement string.
         * @private
         */
        public static fromUnits(measure: string): number {
            return parseFloat(measure.replace(/[^-0-9.]/g, ""));
        }
    }
}