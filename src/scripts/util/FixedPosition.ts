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
            return this.left ? `${this.left}px` : "unset";
        }

        public getRight(): string {
            return this.right ? `${this.right}px` : "unset";
        }

        public getTop(): string {
            return this.top ? `${this.top}px` : "unset";
        }

        public getBottom(): string {
            return this.bottom ? `${this.bottom}px` : "unset";
        }
    }
}