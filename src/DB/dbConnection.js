import mongoose from "mongoose";



export const dbConnection = async () => {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.log("Error in connecting to DB");
        })
} 