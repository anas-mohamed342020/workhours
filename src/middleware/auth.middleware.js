import { roles, userModel } from "../DB/models/user.model.js";
import { verify } from "../Utils/token/verify.js";
import asyncHandler from "express-async-handler";

const rolesArr = Object.values(roles);

export const decodedToken = async ({
  authorization,
  next,
}) => {
  if (!authorization) {
    return next(
      new Error("Token is required", { cause: 400 })
    );
  }

  const [bearer, token] = authorization.split(" ");
  if (!bearer || !token || !rolesArr.includes(bearer)) {
    return next(new Error("Bearer key is required", { cause: 400 }));
  }
  let accessSignature = undefined;
  switch (bearer) {
    case roles.ADMIN:
      accessSignature = process.env.ADMIN_ACCESS_TOKEN ;
      break;
    case roles.USER:
      accessSignature = process.env.USER_ACCESS_TOKEN ;
      break;
    default:
      break;
  }

  const userData = verify(token, accessSignature);
  const user = await userModel.findOne({
    _id: userData._id,
  });

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  console.log({logPasswordChangedAt:user.passwordChangedAt});
  
  // console.log({logPasswordChangedAt: user.passwordChangedAt?.getTime(), logIat: userData.iat});
  if (user.passwordChangedAt?.getTime() >= userData.iat * 1000)
    return next(new Error("please login again", { cause: 400 }));
  return user;
};

export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const user = await decodedToken({
      authorization: req.headers.authorization,
      next,
    });
    req.user = user;
    next();
  });
};

export const isPasswordChanged = () => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user.passwordChanged) {
      return next(new Error("Password not changed", { cause: 400 }));
    }
    next();
  });
};


export const allowTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new Error("You are not allowed to access this endpoint", { cause: 401 })
      );
    next();
  });
};
