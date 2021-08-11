/// <reference path='./Resources.ts' />
/// <reference path='../../api/ImageEntry.ts' />

namespace Win98 {
    // noinspection JSMismatchedCollectionQueryUpdate
    export abstract class ImagePreloader {
        private static readonly images: Array<HTMLImageElement> = [];

        public static load(category: string, name: string): void {
            const image: HTMLImageElement = new Image();
            image.src = Resources.getCategoricalImage(category, name);

            ImagePreloader.images.push(image);
        }

        public static async all() {
            const rawImagesResult = await fetch('/images');
            const images: Array<ImageEntry> = await rawImagesResult.json();

            images.forEach(image => ImagePreloader.load(image.category, image.name));
        }
    }
}