"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 8080;

// Middleware
// Access data from the client side with req.body
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
// Routes
app.use("/blocks", require("./routes/blocks"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// TODO: HTTPS
// var app = require("./app.js");

// require("greenlock-express")
//     .init({
//         packageRoot: __dirname,
//         configDir: "./greenlock.d",

//         // contact for security and critical bug notices
//         maintainerEmail: "jon@example.com",

//         // whether or not to run at cloudscale
//         cluster: false
//     })
//     // Serves on 80 and 443
//     // Get's SSL certificates magically!
//     .serve(app);
