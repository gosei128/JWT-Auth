const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require("dotenv").config();
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

//set cookies

// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true"); {httpsOnyl is to secure connection and cannot modify by the client side}
//   res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//   res.send("you got the cookies");
// });
// app.get("/read-cookies", (req, res) => {
//   const cookie = req.cookies;
//   console.log(cookie);
//   res.json(cookie);
// });

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
