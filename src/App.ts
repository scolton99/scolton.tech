import express from "express";

const { PORT, DEV } = process.env;

const app = express();

app.set("view engine", "pug");
app.set("views", "dist/views");

app.get("/", (_req, res, _next) => {
    return res.render("index");
});

if (DEV)
    app.use('/static', express.static('public'));

app.listen(PORT || 3000);