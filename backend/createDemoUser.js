require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createDemoUser = async () => {
  try {
    await connectDB();
    
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: "hawk@gmail.com" });
    if (existingUser) {
      console.log("Demo user already exists!");
      process.exit(0);
    }
    
    // Create demo user
    const demoUser = await User.create({
      fullName: "Demo User",
      email: "hawk@gmail.com",
      password: "1234", // This will be hashed by the pre-save middleware
      profileImageUrl: ""
    });
    
    console.log("Demo user created successfully!");
    console.log("Email: hawk@gmail.com");
    console.log("Password: 1234");
    process.exit(0);
    
  } catch (error) {
    console.error("Error creating demo user:", error);
    process.exit(1);
  }
};

createDemoUser();