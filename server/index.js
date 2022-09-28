import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";
import reportRoutes from "./routes/reports.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/dashboard/products", productRoutes);
app.use("/dashboard/reports", reportRoutes);

const CONNECTION_URL = process.env.MONGO_DB;

const PORT = process.env.PORT || 5500;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port 5500"));
  })
  .catch((err) => {
    console.log(err);
  });
