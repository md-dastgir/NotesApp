const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();
const app = express();

const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.use("/notes", noteRoutes);
// app.use("/notes", noteRoutes);


app.listen(8000, () => {
    console.log("Server running on port 8000");
});