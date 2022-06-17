const express = require("express");
const nunjucks = require("nunjucks");
const homeRoutes = require("./routes");
const mongoose = require("mongoose");
const multer = require("multer");
const env = require("dotenv").config();
const formData = multer();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://google_test:${process.env.MONGO_PW}@cluster0.pojmb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected"));

class App {
  constructor() {
    this.app = express();

    this.setMiddleware();
    this.onServer();
    this.routes();
    this.setView();
    this.staticFile();
  }

  //   Middleware
  setMiddleware() {
    // this.app.use(bodyParser().json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(formData.array());
  }

  //   ViewEngine
  setView() {
    nunjucks.configure("views", {
      express: this.app,
      watch: true,
    });
  }

  //   Static
  staticFile() {
    this.app.use(express.static("public"));
  }

  // Routes
  routes() {
    this.app.use("/", homeRoutes);
  }

  onServer() {
    this.app.listen(PORT, () => console.log("listening at PORT", PORT));
  }
}

new App();
