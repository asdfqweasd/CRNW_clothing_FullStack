const mongoose = require("mongoose");

const sneakersSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

sneakersSchema.statics.getByQuery = async (query) => {
  const sneakers = await Sneaker.find(query, "id name imageUrl price -_id");
  return sneakers;
};

sneakersSchema.statics.getFullDocByQuery = async (query) => {
  const sneakers = await Sneaker.find(query);
  return sneakers;
};

sneakersSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const sneaker = await Sneaker.findOne({ id: id });
  if (!sneaker) {
    console.log("No sneaker found with id:", id);
    throw new Error("No sneaker found with id");
  }
  return sneaker;
};

const Sneaker = mongoose.model("Sneaker", sneakersSchema, "sneakers");

module.exports = Sneaker;
