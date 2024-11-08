import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../providers/PlayerContextProvider";
import { useEffect, useContext } from "react";
import StartQuizButton from "../components/StartQuizButton";
import { motion } from "framer-motion";

import "./styles/StartQuiz.css";

const buttons = [{
    content: "Play",
    link: "/quiz/play"
},
{
    content: "Select Difficulty Level",
    link: "/quiz/levels"
}];

const containerVariants = {
    hidden: {},
    visible: {transition: {delay: 0.3, staggerChildren: 0.7}},
};

const contentVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 90, damping: 25}}
};

export default function StartQuiz(){
    const { level, setLevel } = useContext(PlayerContext);

    useEffect(() => console.log("level", level), [level]);

    return <motion.div className= "start-quiz-container"
        variants= {containerVariants}
        initial= "hidden"
        animate= "visible"
        whileInView= "visible" 
        viewport= {{once: true}}
    >
        <motion.h1 
            
            variants= {contentVariants}
        >EXOPLANET <br/> QUIZ</motion.h1>
        <motion.p 
            variants= {contentVariants}
        >Test your knowledge on exoplanets with a fun <br/> 10 question quiz!</motion.p>
        <motion.div className= "start-quiz-btns"
            variants= {contentVariants}
        >
            { buttons.map((val, i) => <motion.div
                key= {i}
                variants= {contentVariants}
            >
                <StartQuizButton { ...val } />
            </motion.div>) }
        </motion.div>
    </motion.div>
}   

