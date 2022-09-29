import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";
import reportRoutes from "./routes/reports.js";
import dotenv from 'dotenv'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
dotenv.config()

app.use("/dashboard/products", productRoutes);
app.use("/dashboard/reports", reportRoutes);


const PORT = process.env.PORT || 5500;

const connect = () => {
  mongoose.connect(process.env.MONGO_DB)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};


app.listen(PORT, () => {
  connect();
});