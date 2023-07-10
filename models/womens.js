const mongoose = require("mongoose");

const womensSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

womensSchema.statics.getByQuery = async (query) => {
  const womens = await Women.find(query, "id name imageUrl price -_id");
  return womens;
};

womensSchema.statics.getFullDocByQuery = async (query) => {
  const womens = await Women.find(query);
  return womens;
};

womensSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const women = await Women.findOne({ id: id });
  if (!women) {
    console.log("No women found with id:", id);
    throw new Error("No women found with id");
  }
  return women;
};

const Women = mongoose.model("Women", womensSchema, "womens");

module.exports = Women;
