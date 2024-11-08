import mongoose from "mongoose";

const QUESTION = new mongoose.Schema({
    question: {type: String, required: true},
    options: {type: [String], required: true},
    answerIndex: {type: Number, required: true},
    level: {type: String, enum: ["elementary", "middle school", "high school"] }
});

export const Question = mongoose.model("Question", QUESTION);