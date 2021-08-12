import Resources from './Resources.js';

interface ImageEntry {
  name: string,
  category: string
}

// noinspection JSMismatchedCollectionQueryUpdate
export default abstract class ImagePreloader {
  private static readonly images: Array<HTMLImageElement> = [];

  public static load(category: string, name: string): void {
    const image: HTMLImageElement = new Image();
    image.src                     = Resources.getCategoricalImage(category, name);

    ImagePreloader.images.push(image);
  }

  public static async all(): Promise<void> {
    const rawImagesResult           = await fetch('/images');
    const images: Array<ImageEntry> = await rawImagesResult.json() as Array<ImageEntry>;

    images.forEach(image => ImagePreloader.load(image.category, image.name));
  }
}