const nodeMailer=require("nodemailer")

const sendMail = async (options) => {
    try {
      const transpoter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
  
      await transpoter.sendMail(mailOptions);
      console.log("Email sent successfully to", options.email);
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new Error("Failed to send email");
    }
  };
  

module.exports = sendMail