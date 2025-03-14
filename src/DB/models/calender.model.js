import { Schema, Types } from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
}, {
    _id: false
})

const calenderSchema = new Schema({
    date: {
        type: Date,
        required: true,
        min: [new Date(), 'Date must be in the future']
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    tasks: [{
        type: taskSchema,
    }]
}, {
    timestamps: true
})

export default model = model("Calender", calenderSchema);