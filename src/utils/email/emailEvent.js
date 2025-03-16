import { EventEmitter } from "events";
import { sendEmailAndAppend } from "./sendEmail.js";
import { generateHtml } from "./generateHtml.js";
export const emailEmitter = new EventEmitter();

emailEmitter.on("confirmEmail", async (email, userName, randomPassword) => {
  const html = generateHtml(userName, randomPassword, "Welcome to DigitalH");
  sendEmailAndAppend({
    recipientEmail: email,
    subject: "Welcome to DigitalH",
    body: html,
  });
});
