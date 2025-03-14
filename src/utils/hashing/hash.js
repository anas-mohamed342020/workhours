import { hashSync } from "bcrypt";

export const hash = (value) => {
  return hashSync(value, +process.env.SALT);
};
