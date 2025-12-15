const authService = require("../services/auth.service");

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

module.exports = { register, login };

