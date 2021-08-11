import ImageController from "../controllers/ImageController";
import express from "express";

const controller = new ImageController();
const router = express.Router();

router.get('/', controller.all);

export default router;