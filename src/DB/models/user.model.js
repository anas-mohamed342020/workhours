import { model, Schema } from "mongoose";
export const roles = {
    ADMIN: "admin",
    USER: "user"
}
Object.freeze(roles);

const userSChema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(roles),
        default: roles.USER
    },
    address:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    }
}, {
    timestamps: true
})
export default model = model("User", userSChema);