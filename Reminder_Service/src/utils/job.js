const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    const timestamp = new Date();
    const pendingEmails = await emailService.fetchPendingEmails(timestamp);
    console.log("Fetched pending emails:", pendingEmails.length);
    const response = await emailService.fetchPendingEmails(timestamp);
    console.log("i am going to mail now .... ");
    response.forEach((email) => {
      sender.sendMail(
        {
          from:"reminderservice2002@gmail.com",
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports=setupJobs;
