const mongoose = require("mongoose");

const hatsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

hatsSchema.statics.getByQuery = async (query) => {
  const hats = await Hat.find(query, "id name imageUrl price -_id");
  return hats;
};

hatsSchema.statics.getFullDocByQuery = async (query) => {
  const hats = await Hat.find(query);
  return hats;
};

hatsSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const hat = await Hat.findOne({ id: id });
  if (!hat) {
    console.log("No hat found with id:", id);
    throw new Error("No hat found with id");
  }
  return hat;
};

const Hat = mongoose.model("Hat", hatsSchema, "hats");

module.exports = Hat;
