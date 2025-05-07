// --- Import Core Modules ---
const express = require("express")

// --- App Setup ---
const port = 8080;
const app = express();

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Routes ---
app.use("/api", require("./routes/auth"))

// --- Start the Server ---
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
