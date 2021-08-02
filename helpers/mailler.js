const nodemailer = require("nodemailer");
const env= require('../common/config/env.config');

async function sendEmail(email, subject, payload, template) {
  try {
      
    const smtpEndpoint = env.smtpEndpoint;

    const port = env.email_port;

    const senderAddress = env.senderAddress;

    var toAddress = email;

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
      requireTLC:true,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    const mailOptions = () => {
        return {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: compiledTemplate(payload),
        };
      };
      


        // Send email
        transporter.sendMail(mailOptions(), (error, info) => {
            if (error) {
              return error;
            } else {
              return res.status(200).json({
                success: true,
              });
            }
          });
        
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };