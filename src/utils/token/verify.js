import jwt from "jsonwebtoken";

export const verify = (token, signature = "") => {
  console.log({signature});
  return jwt.verify(token, signature);
};
