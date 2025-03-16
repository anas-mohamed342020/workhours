import nodemailer from "nodemailer";

// Email configuration
const senderEmail = "karim.mohamed@digitalh.dev";
const senderPassword = "nv$6FK|K;h2";
const smtpServer = "smtp.titan.email";
const smtpPort = 587;

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
