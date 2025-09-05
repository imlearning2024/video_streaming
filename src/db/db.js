import mongoose from "mongoose";

const connectDb = async (uri) => {
  try {
    const res = mongoose.connect(uri);
    console.log("mongodb connected !!!!");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
