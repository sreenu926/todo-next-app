import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sreenu926:naga1987@cluster1.zx1f7.mongodb.net/todo-app"
  );
  console.log("DB Connected Successfully");
};
