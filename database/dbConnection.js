import mongoose from "mongoose";

export const dbConnection = async () => {
  // await mongoose.connect("mongodb://127.0.0.1:27017/eCommerce")
  await mongoose
    .connect(process.env.DB_CONNECTION_ONLINE)
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("database connection failed", err);
    });
};
