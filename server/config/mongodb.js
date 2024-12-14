import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
