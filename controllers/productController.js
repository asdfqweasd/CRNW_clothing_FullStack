const models = {
  hats: require("../models/hats"),
  jackets: require("../models/jackets"),
  sneakers: require("../models/sneakers"),
  womens: require("../models/womens"),
  mens: require("../models/mens"),
};

exports.getById = async (req, res) => {
  try {
    const type = req.params.type;
    const id = Number(req.params.id);
    const Model = models[type];
    if (!Model) {
      return res.status(400).json({ message: `Invalid product type: ${type}` });
    }
    const product = await Model.getById(id);
    if (!product) {
      return res.status(404).json({ message: `No hat found with id: ${id}` });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
