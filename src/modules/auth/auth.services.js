import { roles, userModel } from "../../DB/models/user.model.js";
import { emailEmitter } from "../../utils/email/emailEvent.js";
import { generateHtml } from "../../utils/email/generateHtml.js";
import { hash } from "../../utils/hashing/hash.js";
import { generateRandomPassword } from "./utils/rondomPass.js";
import { compare } from "../../utils/hashing/compare.js";
import { sign } from "../../utils/token/sign.js";


export const addUser = async (req, res, next) => {
    const { name, email, phone, address } = req.body;
    const isEmailExist = await userModel.findOne({ email })
    if (isEmailExist) {
        return next(new Error("Email already exists", { cause: 400 }))
    }
    // generate random password from 12 characters don't contains special characters
    const randomPassword = generateRandomPassword(16)
    // await emailEmitter.emit("confirmEmail", email, name, randomPassword)
    const user = await userModel.create({
        name,
        email,
        password: hash(randomPassword),
        phone,
        address
    })
    res.status(201).json({ message: "User created successfully", password: randomPassword })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("Invalid email", { cause: 400 }))
    }
    const isPasswordMatch = compare({ data: password, encrypted: user.password })
    if (!isPasswordMatch) {
        return next(new Error("Invalid password", { cause: 400 }))
    }
    const signature = user.role == roles.ADMIN ? process.env.ADMIN_ACCESS_TOKEN : process.env.USER_ACCESS_TOKEN
    console.log({logSignature:signature});
    
    const token = sign({ _id: user._id }, signature)
    res.status(200).json({ message: "Login successful", token })
}


export const changePassword = async (req, res, next) => {
    const { oldPassword,newPassword} = req.body;
    const user = await userModel.findOne({ _id: req.user._id })
    if (!user) {
        return next(new Error("User not found", { cause: 404 }))
    }
    const isPasswordMatch = compare({ data: oldPassword, encrypted: user.password })
    if (!isPasswordMatch) {
        return next(new Error("not correct password", { cause: 400 }))
    }
    user.password = hash(newPassword)
    user.passwordChangedAt = new Date()
    user.passwordChanged = true
    await user.save()
    res.status(200).json({ message: "Password changed successfully" })
}