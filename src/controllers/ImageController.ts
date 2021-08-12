import * as path from "path";
import * as fs from "fs";
import { Request, Response } from 'express';

interface ImageEntry {
    name: string,
    category: string
}

export default class ImageController {
    private static readonly IMAGE_PATH: string = path.resolve(process.cwd(), "public/assets/images");

    public all(req: Request, res: Response): void {
        const imgs: Array<ImageEntry> = [];
        const categories = fs.readdirSync(ImageController.IMAGE_PATH, { withFileTypes: true }).filter(it => it.isDirectory());

        for (const category of categories) {
            const images = fs.readdirSync(path.resolve(ImageController.IMAGE_PATH, category.name), {withFileTypes: true});

            for (const image of images) {
                const imageInfo = path.parse(image.name);
                imgs.push({ category: category.name, name: imageInfo.name });
            }
        }

        res.json(imgs);
    }
}