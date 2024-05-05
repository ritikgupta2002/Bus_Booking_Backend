const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiRoutes = require("./routes/index.js");
const app = express();

const db=require('./models/index.js');
const {User,Role}=require('./models/index.js'); 

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    // if(process.env.DB_SYNC){
    //   db.sequelize.sync({alter:true});
    // }
    const u1 = await User.findByPk(1);
    const r1 = await Role.findByPk(3);
    //u1.addRole(r1);
    

  });
};

prepareAndStartServer();
