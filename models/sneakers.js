const mongoose = require("mongoose");

const sneakersSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

sneakersSchema.statics.getByQuery = async (query) => {
  const sneakers = await Hat.find(query, "id name imageUrl price -_id");
  return sneakers;
};

sneakersSchema.statics.getFullDocByQuery = async (query) => {
  const sneakers = await Hat.find(query);
  return sneakers;
};

sneakersSchema.statics.getById = async (id) => {
  const sneaker = await Sneaker.findOne({ id: id });
  if (!sneaker) {
    throw new Error("No found with id");
  }
  return hat;
};

const Sneaker = mongoose.model("Sneaker", sneakersSchema, "sneakers");

module.exports = Sneaker;
