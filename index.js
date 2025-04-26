const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./src/routes/todoRoutes');
const connectDB = require('./src/config/db'); 

dotenv.config(); 
connectDB();    

const app = express(); 
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(router); 

app.get("/", (req, res) => {
  res.status(200).send("🚀 Hello World! Server is Running");
});

app.listen(port, () => {
  console.log(`🌐 Server is listening on port: ${port}`);
});
