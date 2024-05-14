const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

const {sendBasicEmail} = require("./services/email-service");

const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
   sendBasicEmail(
      "support@admin.com",
      "reminderservice2002@gmail.com",
      "testing mail ",
      "this is a testing mail "
    );
  });
};

setupAndStartServer();
