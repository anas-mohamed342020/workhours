import mongoose from "mongoose";



export const dbConnection = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.log("Error in connecting to DB");
        })
} 