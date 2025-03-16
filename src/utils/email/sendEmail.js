import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Email configuration
const senderEmail = process.env.SENDER_EMAIL ;
const senderPassword = process.env.SENDER_PASSWORD ;
const smtpServer = process.env.SMTP_SERVER;
const smtpPort = process.env.SMTP_PORT;


export async function sendEmailAndAppend({ recipientEmail, subject, body }) {
  try {
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    async function main() {
      const info = await transporter.sendMail({
        from: senderEmail,
        to: recipientEmail,
        subject,
        html: body,
      });
    }
    main();
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
