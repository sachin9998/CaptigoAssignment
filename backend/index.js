import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import authRouter from "./Routes/auth.route.js";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    success: true,
  });
});

// Routes
app.use("/auth", authRouter);

// Server listening
app.listen(3000, (req, res) => {
  console.log("Server is running on port: ", port);
  connectDB();
});
