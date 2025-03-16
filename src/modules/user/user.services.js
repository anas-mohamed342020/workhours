import { userModel } from "../../DB/models/user.model.js";




export const getProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id).select('-password -__v -passwordChanged -createdAt -updatedAt -passwordChangedAt')
    if (!user) {
        return next(new Error("User not found", { cause: 404 }))
    }
    res.status(200).json({ profile: user })
}


// update profile
export const updateProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id)
    if (!user) {
        return next(new Error("User not found", { cause: 404 }))
    }
    user.name = req.body.name || user.name
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    await user.save()
    res.status(200).json({ message: "Profile updated successfully" })
}
