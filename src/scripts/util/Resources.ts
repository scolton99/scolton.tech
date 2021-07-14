namespace Win98 {
    export abstract class Resources {
        private static readonly ROOT: string = '/static/assets/images';

        public static getWindowImage(name: string) {
            return Resources.getCategoricalImage('windows', name);
        }

        public static getWindowImageExt(nameWithExt: string) {
            return Resources.getCategoricalImageExt('windows', nameWithExt);
        }

        public static getCategoricalImage(category: string, name: string) {
            return `${Resources.ROOT}/${category}/${name}.png`;
        }

        public static getCategoricalImageExt(category: string, nameWithExt: string) {
            return `${Resources.ROOT}/${category}/${nameWithExt}`;
        }

        public static getCSSCategoricalImage(category: string, name: string) {
            return `url('${Resources.getCategoricalImage(category, name)}')`;
        }

        public static getCSSCategoricalImageExt(category: string, name: string) {
            return `url('${Resources.getCategoricalImageExt(category, name)}')`;
        }
    }
}