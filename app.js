// Packages
const express = require("express");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api.routes");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiRouter);
console.log(`Initialised application 🧨`);

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Running server in space 🚀. \nListening on ${PORT} 👂`)
);

module.exports = app;
