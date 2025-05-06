// --- Load Environment Variables ---
require('dotenv').config();

// --- Import Core Modules ---
const express = require("express")
const exphb = require("express-handlebars")
const session = require("express-session");

// --- App Setup ---
const port = 8080;
const app = express();

// --- Templating Engine ---
const hbs = exphb.create({
    defaultLayout: "main"
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

// --- Middleware ---
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1 * 60 * 60 * 1000 // Hours -> Minutes -> Seconds -> Milliseconds
    }
}));

// --- Routes ---
app.get("/", (req, res) => {
    // res.redirect("/user/dashboard")
    res.send("SIB")
})

app.use("/api", require("./routes/api"))

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
