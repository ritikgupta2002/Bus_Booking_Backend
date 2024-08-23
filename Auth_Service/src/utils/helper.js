const generateVerificationCode = ()=>{
     const length = 4;
     const charset="0123456789abcdefgh";
     let verificationCode="";
     for(let i =0;i<length;i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        verificationCode += charset[randomIndex];
     }
     return verificationCode;
}

module.exports={
    generateVerificationCode
}