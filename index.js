const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./src/routes/todoRoutes'); // <-- this is your todoRoutes
const connectDB = require('./src/config/db'); 
const authRoutes = require('./src/routes/authRoutes');
const protect = require('./src/middlewares/authMiddleware');

dotenv.config(); 
connectDB();    

const app = express(); 
const port = process.env.PORT || 8007;

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(router); // <-- Use router here as you're importing it
app.use("/api/auth", authRoutes);
app.use("/api/todo", protect, router); // <-- Use router for the todo routes

app.get("/", (req, res) => {
  res.status(200).send("🚀 Hello World! Server is Running");
});

app.listen(port,'0.0.0.0', () => {
  console.log(`🌐 Server is listening on port: ${port}`);
});
