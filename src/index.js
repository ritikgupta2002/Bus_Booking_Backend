const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig.js");
const app = express();

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server start on PORT:${PORT}`);
  });
};

setupAndStartServer();
