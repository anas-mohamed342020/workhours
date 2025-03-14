import userModel from "../../DB/models/user.model.js";
import { hash } from "../../utils/hashing/hash.js";



export const addUser = async (req, res, next) => {
    const { name, email, password, phone, address } = req.body;
    const isEmailExist = await userModel.findOne({ email })
    if (isEmailExist) {
        return next(new Error("Email already exists", { cause: 400 }))
    }
    // generate random password from 12 characters don't contains special characters
    const randomPassword = Math.random().toString(36).slice(-12);


    const user = await userModel.create({
        name,
        email,
        password: hash(password),
        phone,
        address
    })
    res.status(201).json({ message: "User created successfully", password })
}