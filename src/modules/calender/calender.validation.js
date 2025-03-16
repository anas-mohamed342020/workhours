import joi from "joi";
import { Types } from "mongoose";

export const addCalenderSchema = joi
  .object({
    data: joi.date().required(),
    userId: joi
      .custom((value, helper) => {
        return Types.ObjectId.isValid(value)
          ? true
          : helper.message("In-valid ObjectId");
      })
      .required(),
    updatedBy: joi.custom((value, helper) => {
      return Types.ObjectId.isValid(value)
        ? true
        : helper.message("In-valid ObjectId");
    }),
    tasks: joi
      .array()
      .items(
        joi.object({
          task: joi.string().required(),
          notes: joi.string(),
          taskLink: joi.string(),
          start: joi.number().required(),
          end: joi.number().required(),
        })
      )
      .required(),
  })
  .required();
