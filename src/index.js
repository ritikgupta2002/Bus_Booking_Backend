const express = require("express");
const bodyParser = require("body-parser");
const {PORT}=require("./config/ServerConfig.js");

const ApiRoutes=require("./routes/index.js");//get the router

const SetupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api",ApiRoutes);//mapping with ApiRoutes

  app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(process.env.PORT)
  });
};
SetupAndStartServer();