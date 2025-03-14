import { EventEmitter } from "events";
import { sendEmail } from "./sendEmail.js";
import { generateHtml } from "./generateHtml.js";
export const emailEmitter = new EventEmitter();


emailEmitter.on("confirmEmail", async (email, userName, randomPassword) => {
  const html = generateHtml(userName, randomPassword, "Welcome to DigitalH")
  sendEmail({ to: email, subject: "Welcome to DigitalH", html });
});

