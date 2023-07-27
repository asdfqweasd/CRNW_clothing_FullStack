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

exports.getAll = async (req, res) => {
  try {
    let allProducts = [];
    for (const model in models) {
      console.log(`Loading products for model: ${model}`);
      const products = await models[model].getByQuery({});
      console.log(`Loaded ${products.length} products for model: ${model}`);
      const category = {
        title: model,
        items: products,
      };
      allProducts.push(category);
    }
    console.log(`Loaded total of ${allProducts.length} products`);
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
