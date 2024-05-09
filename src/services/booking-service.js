
const{BookingRepository}=require("../repository/index");

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    
}



module.exports=BookingService;