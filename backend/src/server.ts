import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await  mongoose.connect('mongodb://localhost:27017/pickme')
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));