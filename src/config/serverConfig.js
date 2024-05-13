const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  BUS_SEARCH_SERVICE_PATH: process.env.BUS_SEARCH_SERVICE_PATH,
};
