const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Initialize admin user
const initializeAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminUser = await User.findOne({ email: "admin@sweetshop.com" });
    
    if (!adminUser) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        email: "admin@sweetshop.com",
        password: hashedPassword,
        role: "ADMIN"
      });
      console.log("Admin user created: admin@sweetshop.com / admin123");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
};

// Connect to database, then start server
connectDB()
  .then(async () => {
    // Initialize admin user
    await initializeAdminUser();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });