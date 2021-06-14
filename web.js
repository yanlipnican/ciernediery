import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

const PORT = process.env.PORT || 5000

const ROOT = path.resolve();

express()
  .use(express.static(path.resolve(ROOT, "public")))
  .set("views", path.resolve(ROOT, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
