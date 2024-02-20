const express = require("express");
const bodyParser = require("body-parser");
const {PORT}=require("./config/ServerConfig.js");

const SetupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(process.env.PORT)
  });
};
SetupAndStartServer();