import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/user");
    console.log("Database connected succesffuly");
  } catch (error) {
    console.error("connection error", error);
    process.exit(1);
  }
};


