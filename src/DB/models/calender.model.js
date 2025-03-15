import { Schema, Types } from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    notes:String,
    taskLink:String,
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
        required: true,//14-3-2024
        min: [new Date(), 'Date must be in the future']
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    tasks: [{
        type: taskSchema,
    }],
    updatedBy: {
        type: Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

export const calenderModel = model("Calender", calenderSchema);
