const sender = require("../config/emailConfig");
const TicketRepository=require("../repository/ticket-repository");
const ticketRepository = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const fetchPendingEmails=async(timestamp)=>{
    try {
        const response = await ticketRepository.get({
            status:"PENDING",
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}


const updateTicket=async(ticketId,data)=>{
    try {
        const response = await ticketRepository.update(ticketId,data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification=async(data)=>{
    try {
        console.log(data);
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const subscribeEvents=async()=>{

}

module.exports={
    sendBasicEmail,
    fetchPendingEmails,
    updateTicket,
    createNotification,
    subscribeEvents
}