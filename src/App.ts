import express from "express";
import imagesRouter from "./routes/Images.js";

const { PORT, DEV } = process.env;
const DEFAULT_PORT = 3000;

const app = express();

app.set("view engine", "pug");
app.set("views", "dist/views");

app.get("/", (_req, res) => {
    return res.render("index");
});

app.use('/images', imagesRouter);

if (DEV)
    app.use('/static', express.static('public'));

app.listen(PORT || DEFAULT_PORT);