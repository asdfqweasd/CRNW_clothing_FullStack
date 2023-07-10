const mongoose = require("mongoose");

const mensSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

mensSchema.statics.getByQuery = async (query) => {
  const mens = await Mens.find(query, "id name imageUrl price -_id");
  return mens;
};

mensSchema.statics.getFullDocByQuery = async (query) => {
  const mens = await Mens.find(query);
  return mens;
};

mensSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const Mens = await Mens.findOne({ id: id });
  if (!Mens) {
    console.log("No Mens found with id:", id);
    throw new Error("No Mens found with id");
  }
  return Mens;
};

const Mens = mongoose.model("Mens", mensSchema, "mens");

module.exports = Mens;
