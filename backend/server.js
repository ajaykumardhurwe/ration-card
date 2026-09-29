

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const rationCardRoutes = require("./routes/rationCardRoutes");
const masterRoutes = require('./routes/masterRoutes');


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ration Card API is running"
    });
});


// Ration Card APIs
app.use("/api/ration-cards", rationCardRoutes);
app.use('/api/master', masterRoutes);


// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});