namespace Win98 {
    export class FixedPosition {
        public left: number;
        public right: number;
        public top: number;
        public bottom: number;

        public constructor(top: number, right: number, bottom: number, left: number) {
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            this.left = left;
        }

        public getLeft(): string {
            return `${this.left}px`;
        }

        public getRight(): string {
            return `${this.right}px`;
        }

        public getTop(): string {
            return `${this.top}px`;
        }

        public getBottom(): string {
            return `${this.bottom}px`;
        }
    }
}