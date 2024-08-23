const axios=require('axios');

const authenticate = async (req, res, next) => {
    try {
      const token=req.headers['x-access-token'];
      if(!token){
        return res.status(401).json({
          success:false,
          message:"No token provided"
        })
      }
    //   const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaGRldmd1cHRhcm9ja3MyMDAyQGdtYWlsLmNvbSIsImlkIjo4LCJpYXQiOjE3MjAxNzg4MTMsImV4cCI6MTcyMDM1MTYxM30.KHfbGXixs0MM6Twwcj3F4cKtd8wYpzaFaeuya12cOvM";
      const authResponse = await axios.get(
        "http://localhost:3001/api/v1/isAuthenticated",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
  
      if (authResponse.data.success) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: authResponse.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  module.exports=authenticate;