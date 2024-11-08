import mongoose from "mongoose";
import express from "express";
import {Question} from "./model.js";
import cors from "cors";

mongoose.connect("mongodb+srv://medicalhistory9:techtonic@techtonic-hackathon.iduaa2o.mongodb.net/space-app?retryWrites=true&w=majority&appName=Techtonic-Hackathon")
.then(() => console.log("Connected to the database."))
.catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("LISTENING ON PORT", PORT));

app.get("/questions/:level", async (req, res) => {
    const level = req.params;
    console.log(level);

    try{
        const size = 10;
        const questions = await Question.aggregate([
            {$match: level},
            {$sample: {size}}
        ]);
        console.log(questions);
        res.json({questions});
    }catch(err){
        console.log("err", err);
        res.status(500).json({error: "Something went wrong."});
    }
});

app.post("/questions", async (req, res) => {
    try{
        const questions = req.body;
        const result = await Question.create(questions);
        res.json({result});
    }catch(err){
        console.log("error", err);
        res.status(404).json({error: err});
    }
});