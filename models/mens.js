const mongoose = require("mongoose");

const mensSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

mensSchema.statics.getByQuery = async (query) => {
  const mens = await Men.find(query, "id name imageUrl price -_id");
  return mens;
};

mensSchema.statics.getFullDocByQuery = async (query) => {
  const mens = await Men.find(query);
  return mens;
};

mensSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const men = await Men.findOne({ id: id });
  if (!men) {
    console.log("No men found with id:", id);
    throw new Error("No men found with id");
  }
  return men;
};

const Men = mongoose.model("Men", mensSchema, "mens");

module.exports = Men;
