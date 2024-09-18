const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Rambiharipalacewebsite@gmail.com",
    pass: "febk anzo qdix lklm",
  },
});






async function sendEmail(email, subject, text) {
  try {
    let info = await transporter.sendMail({
      from: "Rambiharipalacewebsite@gmail.com",
      to: "gamerronak9@gmail.com",
      subject: subject,
      text: text
    });
    console.log('Message sent: %s', info.messageId);
    
    return info.messageId;
  } catch (error) {
    console.error('Error occurred while sending email:', error.message);
    throw error;
  }
}

module.exports = { sendEmail };
