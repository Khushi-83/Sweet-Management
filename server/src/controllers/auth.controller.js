const authService = require("../services/auth.service");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.registerUser(email, password);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    // Get the full user document from the database
    const userDoc = await User.findById(req.user.id);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Create user object that matches frontend expectations
    const user = {
      id: userDoc._id.toString(),
      email: userDoc.email,
      name: userDoc.email.split('@')[0],
      role: userDoc.role.toLowerCase(), // Convert to lowercase to match frontend
      createdAt: userDoc.createdAt
    };
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user information" });
  }
};

module.exports = { register, login, getMe };