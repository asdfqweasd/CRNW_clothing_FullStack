const mongoose = require("mongoose");

const jacketsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

jacketsSchema.statics.getByQuery = async (query) => {
  const jackets = await Jackets.find(query, "id name imageUrl price -_id");
  return jackets;
};

jacketsSchema.statics.getFullDocByQuery = async (query) => {
  const jackets = await Jackets.find(query);
  return jackets;
};

jacketsSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const jacket = await Jackets.findOne({ id: id });
  if (!jacket) {
    console.log("No Jackets found with id:", id);
    throw new Error("No Jackets found with id");
  }
  return jacket;
};

const Jackets = mongoose.model("Jackets", jacketsSchema, "jackets");

module.exports = Jackets;
