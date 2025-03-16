import { calenderModel } from "../../DB/models/calender.model.js";

export const addCalender = async (req, res, next) => {
  const calender = await calenderModel.create({ ...req.body });

  res.status(201).json({ message: "Calender created successfully", calender });
};
