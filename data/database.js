import mongoose from "mongoose";
import express from "express";
const app = express();

function database() {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "backendapi",
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

}

export default database;
