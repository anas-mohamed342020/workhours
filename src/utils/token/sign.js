import jwt from "jsonwebtoken";

export const sign = (payload = {}, signature = "") => {
  return jwt.sign(payload, signature);
};
