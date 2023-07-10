const mongoose = require("mongoose");

const jacketsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
});

jacketsSchema.statics.getByQuery = async (query) => {
  const jackets = await Jacket.find(query, "id name imageUrl price -_id");
  return jackets;
};

jacketsSchema.statics.getFullDocByQuery = async (query) => {
  const jackets = await Jacket.find(query);
  return jackets;
};

jacketsSchema.statics.getById = async (id) => {
  console.log("getById called with id:", id);
  const jackets = await Jacket.findOne({ id: id });
  if (!jackets) {
    console.log("No jackets found with id:", id);
    throw new Error("No jackets found with id");
  }
  return jackets;
};

const Jacket = mongoose.model("Jacket", jacketsSchema, "jackets");

module.exports = Jacket;
