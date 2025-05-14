// --- Import Core Modules ---
const express = require("express");
const cors = require("cors");

// --- App Setup ---
const port = 3001;
const app = express();

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// --- Routes ---
app.use("/api", require("./routes/api.js"))

// --- Start the Server ---
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
