// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.DB_URI)
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed");
//     console.error(err);
//   });

// // Routes
// const studentRoutes = require("./routes/studentRoutes.js");
// app.use("/api/students", studentRoutes);

// // Server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// ---------------------
// Middlewares
// ---------------------
app.use(cors());
app.use(express.json());

// ---------------------
// ---------------------
// MongoDB Connection
// ---------------------
const dbUri = process.env.MONGO_URI;

console.log("🚀 Connecting to MongoDB...");
console.log("DB URI:", dbUri ? dbUri.replace(/:(.*)@/, ":*****@") : "Not set"); // hide password in logs

mongoose
  .connect(dbUri) // <--- just pass URI, no extra options
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err);
    process.exit(1); // stop server if DB connection fails
  });

// ---------------------
// Routes
// ---------------------
const studentRoutes = require("./routes/studentRoutes.js");
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => res.send("Server is running 🚀"));

// ---------------------
// Start Server
// ---------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
