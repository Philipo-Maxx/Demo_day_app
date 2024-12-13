import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.Mongo_URL);
    console.log(connect.connection.host);
  } catch (error) {
    console.log(`Error connecting to DB ${error}`);
  }
};

export { connectDb };
