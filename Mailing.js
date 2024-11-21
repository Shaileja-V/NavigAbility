const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.mail_server,
  auth: {
    user: process.env.mail_user,
    pass: process.env.mail_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


async function sendEmail({subject, text, senderName,senderEmail}) {
  try {
    await transporter.sendMail({
      from: process.env.mail_user,
      to: process.env.mail_receiver,
      subject: subject,
      html:`
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Navigability Support</title>
</head>
<body>

  <table style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0 auto; border-collapse: collapse; width: 600px; background-color: #ffffff;">
    <tr>
      <td style="padding: 20px; background-color: #f9f9f9;">
        <img src="https://firebasestorage.googleapis.com/v0/b/app4035-project.appspot.com/o/icon.png?alt=media&token=c09ca132-d04b-4730-9e13-9421d902464a" alt="Your Logo" style="display: block; margin: 0 auto; max-width: 230px; height: 200px;">

        <h1 style="color: #333;">Hello, Shaileja!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; color: #00072D;">
        <p>${text}</p>
        <p>Please reach out to me via my email: ${senderEmail}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; background-color: #00072D; text-align: center; color: #fff;">
        <p>Thank you for your time, ${senderName}</p>
      </td>
    </tr>
  </table>

</html>
`
    });
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
}


module.exports ={
    sendEmail: sendEmail
}