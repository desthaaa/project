// backend/server.js
const express = require("express"); //utk panggil pihak lain
const mongoose = require("mongoose"); //utk mongodb
const cors = require("cors"); //
require("dotenv").config(); //utk panggil dotenv

const barangRoutes = require("./routes/barangRoutes"); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware utk atur
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/barangs", barangRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});