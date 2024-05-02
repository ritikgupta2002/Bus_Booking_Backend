
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      name:req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      messasge: "Successfully created user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messasge: error.messasge,
      data: {},
      err: error.explanation,
    });
  }
};

const signIn=async(req,res)=>{
  try {
   const response = await userService.signIn(
     req.body.email,
     req.body.password
   );
   return res.status(200).json({
    success:true,
    message:"successfully signed in ",
    data:response,
    err:{}
   })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"invalid email or password",
      data:{},
      err:error.explanation
    })
  }
}




module.exports={
    create,
    signIn
    
}
