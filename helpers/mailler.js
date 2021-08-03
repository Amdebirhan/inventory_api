const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const env= require('../common/config/env.config');
const fs = require('fs');
const path = require("path");

async function sendEmail(email, subject, payload, template) {
  try {
      
    const smtpEndpoint = env.smtpEndpoint;

    const port = env.email_port;

    const senderAddress = env.senderAddress;

    var toAddress = email;

    var subject = subject;

    const smtpUsername = env.smtpUsername;

    const smtpPassword = env.smtpPassword;

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(source);

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      //secure: true, // true for 465, false for other ports
      secure:false,
      requireTLS: true,
      auth: {
        user: senderAddress,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    const mailOptions = {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: compiledTemplate(payload),
      };
      


        // Send email
       let info= transporter.sendMail(mailOptions);
       if(info){
        return { error: false };
       }
          return { error: true };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };