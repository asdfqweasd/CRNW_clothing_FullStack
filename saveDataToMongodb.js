const mongoose = require("mongoose");
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/shopData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const hatSchema = new Schema({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
});

const Hat = mongoose.model("Hat", hatSchema, "Sneakers");

fs.readFile("./data/Sneakers.json", "utf8", async (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  let hatsData = JSON.parse(data);

  for (let hatData of hatsData) {
    let hat = new Hat(hatData);
    try {
      const doc = await hat.save();
      console.log("data saved");
    } catch (err) {
      console.log(err);
    }
  }
});
