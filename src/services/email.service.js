const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger! 🎉";

  const text = `Hello ${name},

Thank you for registering with Backend Ledger.

We're delighted to have you on board! Your account has been created successfully, and you can now start using our platform.

If you did not create this account, please ignore this email or contact our support team immediately.

Best regards,
The Backend Ledger Team`;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; color: #333;">
    <h2 style="color: #2563eb;">Welcome to Backend Ledger! 🎉</h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>
      Thank you for registering with <strong>Backend Ledger</strong>.
    </p>

    <p>
      We're delighted to have you on board! Your account has been created
      successfully, and you can now start using our platform.
    </p>

    <p>
      If you did not create this account, you can safely ignore this email.
    </p>

    <br>

    <p>
      Best regards,<br>
      <strong>The Backend Ledger Team</strong>
    </p>

    <hr>

    <p style="font-size: 12px; color: #777;">
      This is an automated email. Please do not reply to this message.
    </p>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };
