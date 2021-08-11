namespace Win98 {
    export abstract class UUID {
        /**
         * Generate a UUID as a string.
         * Taken from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
         */
        public static generate(): string {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
}