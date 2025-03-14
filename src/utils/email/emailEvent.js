import { EventEmitter } from "events";
import { sendEmail, subject } from "./sendEmail.js";
import { generateHtml } from "./generateHtml.js";
import { customAlphabet } from "nanoid";
import { userModel } from "../../DB/models/user.model.js";
import { hash } from "../hashing/hash.js";
export const emailEmitter = new EventEmitter();

export const createOtp = () => {
  const otp = customAlphabet("0123456789", 6)();
  return otp;
};

emailEmitter.on("confirmEmail", async (email, id, userName) => {
  const otp = createOtp();
  await userModel.updateOne({ _id: id }, { confirmEmailOtp: hash(otp) });
  const html = generateHtml(userName, otp, subject.register);
  sendEmail({ to: email, subject: subject.register, html });
});

emailEmitter.on("forgetPassword", async ({ email, userName, id }) => {
  const otp = createOtp();
  await userModel.updateOne({ _id: id }, { resetPasswordOtp: hash(otp) });

  sendEmail({
    to: email,
    subject: subject.resetPassword,
    html: generateHtml(userName, otp, subject.resetPassword),
  });
});
