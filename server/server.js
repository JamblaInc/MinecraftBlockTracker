"use strict";

const express = require("express");
const https = require("https");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

// Middleware
// Access data from the client side with req.body
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/blocks", require("./routes/blocks"));

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// HTTPS
// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
//   },
//   app
// );

// sslServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
