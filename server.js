import { createServer } from "https";
import { readFileSync } from "fs";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, HTTPS world!");
});

// Load the certificate and key
const options = {
  key: readFileSync("localhost-key.pem"), // Replace with your key file path
  cert: readFileSync("localhost.pem"), // Replace with your cert file path
};

createServer(options, app).listen(3000, () => {
  console.log("HTTPS server running at https://localhost:3000");
});
