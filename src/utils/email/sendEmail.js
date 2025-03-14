import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const sendEmail = asyncHandler(({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: `DigitalH "<${process.env.EMAIL_USER}>"`,
      to,
      subject, 
      html,
    });
  }
  main();
});