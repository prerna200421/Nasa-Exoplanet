import { PlayerContext } from "../providers/PlayerContextProvider";
import StartQuizButton from "./StartQuizButton";
import "../pages/styles/QuizScoreCard.css";
import { useContext } from 'react';
import { motion } from "framer-motion";

export const buttons = [{
    content: "Play Again",
    link: "/quiz/start"
},
{
    content: "Select Difficulty Level",
    link: "/quiz/levels"
}];

const QuizScoreVariants = {
    hidden: {},
    visible: { transition: {staggerChildren: 0.1}}
};
 
const infoVariants = {
    hidden: {x: -100, opacity: 0},
    visible: {x: 0, opacity: 1, staggerChildren: 0.1},
    transition: {type: "spring", stiffness: 90, damping: 25}  
};

const scoreVariant = {
    hidden: {scale: 0, opacity: 0},
    visible: {scale: 1, opacity: 1},
    transition: {type: "spring", stiffness: 90, damping: 25}  
};

export default function QuizScoreCard(){
    const { score } = useContext(PlayerContext);

    return <motion.div className= "quiz-score-container"
        variants= {QuizScoreVariants}
        initial= "hidden"
        animate= "visible"
    >
        <motion.h1
            variants= {scoreVariant}
        >You scored:</motion.h1>
        <motion.h2 variants= {scoreVariant}>{score.current}</motion.h2>
        <motion.div className= "score-quiz-btns"
            variants= {infoVariants}
        >
            { buttons.map((val, i) => <StartQuizButton key= {i} { ...val } />) }
        </motion.div>
    </motion.div>
}