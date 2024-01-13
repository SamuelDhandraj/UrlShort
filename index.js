const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/UrlShort");
const { UrlModel } = require("./models/url-model");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  let allUrls = UrlModel.find()
    .then(function (allUrlData) {
      res.render("home", {
        allUrlData,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/create", function (req, res) {
  let myRandNumer = Math.floor(Math.random() * 30000);
  let newUrlShort = new UrlModel({
    longUrl: req.body.longUrl,
    shortUrl: myRandNumer,
  });

  newUrlShort
    .save()
    .then(function (savedData) {
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/:shortId", function (req, res) {
  UrlModel.findOne({ shortUrl: req.params.shortId })
    .then(function (data) {
      UrlModel.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } })
        .then(function (updateData) {
          res.redirect(data.longUrl);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/delete/:id", function (req, res) {
  UrlModel.findByIdAndDelete({ _id: req.params.id })
    .then(function (data) {
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log("The app is listening in PORT 3000");
});
