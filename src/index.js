require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const helmet = require("helmet");

const app = express();
app.use(cors());
app.use(formidable({ multiples: true }));
app.use(helmet());

// Cloudinary logs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoutes = require("../routes/user");
app.use(userRoutes);
const offerRoutes = require("../routes/offer");
app.use(offerRoutes);

const paymentRoutes = require("../routes/payment");
app.use(paymentRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API de Vinted");
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

//  Start server
app.listen(process.env.PORT, () => {
  console.log("Server launched");
});
