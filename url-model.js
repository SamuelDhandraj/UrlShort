const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

const UrlModel = mongoose.model("URL", urlSchema);

module.exports = { UrlModel };
