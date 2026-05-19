const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("MongoDB Connected");
})

.catch((error) => {
  console.log(error);
});


// Test Route
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});


// Routes
const complaintRoutes = require("./routes/complaintRoutes");

const aiRoutes = require("./routes/aiRoutes");

const authRoutes = require("./routes/authRoutes");


// API Routes
app.use("/api/complaints", complaintRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);


// Port
const PORT = process.env.PORT || 5000;


// Server Start
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});