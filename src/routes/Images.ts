import ImageController from "../controllers/ImageController.js";
import express from "express";

const controller = new ImageController();
const router = express.Router();

router.get('/', controller.all.bind(controller));

export default router;