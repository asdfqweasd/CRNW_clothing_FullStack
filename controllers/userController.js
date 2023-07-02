const Users = require("../models/users");
const {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
} = require("../utilities/authentication");

exports.userRegister = async (req, res) => {
  try {
    //get the eamil and password
    const { email, password } = req.body;
    //check if the request data is valid
    if (email === "" || password === "") {
      return res.json({ msg: "InvalidData" });
    }
    // check if the user is existed
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "userExists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await Users.createUser({ email, password: hashedPassword });
    const token = generateToken(newUser);
    res.status(201).json({ msg: "userAdded", email, token });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if the email is existed
    const user = await Users.getByQueryWithPass({ email });
    if (!user) {
      return res.json({ msg: "noEmail" });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.json({ msg: "WrongPass" });
    }
    const token = generateToken(user);
    res.status(200).json({ msg: "loggedIn", token, email });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
