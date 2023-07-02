const Hat = require("../models/hats");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const hat = await Hat.getById({ id: { $eq: id } });
    if (!hat) {
      return res.status(404).json({ message: `No hat found with id: ${id}` });
    }
    res.json(hat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
