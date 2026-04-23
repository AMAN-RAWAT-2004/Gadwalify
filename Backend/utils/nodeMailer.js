const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `Aman <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,      // fallback
      html: options.html          // ✅ for links/buttons
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully ✅");

  } catch (error) {
    console.error("Email error ❌:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;