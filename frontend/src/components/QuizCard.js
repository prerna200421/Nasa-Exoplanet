import { useState, useEffect, useRef, useContext } from "react";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { PlayerContext } from "../providers/PlayerContextProvider";

const QuizCardVariants = {
    hidden: {},
    visible: {
        transition: {staggerChildren: 0.1}
    },
    exit: {
        transition: {staggerChildren: 0.05}
    },
};

const OptionVariants = {
    hidden: { opacity: 0 },
    visible: {
        y: [100, 0], opacity: 1, transition: {type: "spring", stiffness: 90, damping: 25} 
    },
    exit: {
        y: 200, 
        opacity: 0, 
    }
}

const h2Variants = {
    hidden: {x: -300, opacity: 0},
    visible: {x: 0, opacity: 1, transition: { type: "spring", damping: 25 }},
    exit: {x: 300, opacity: 0} 
};

export default function QuizCard({setCurrentQuestion, question, options, answerIndex}){
    const { guess, setGuess } = useContext(PlayerContext);

    return <motion.div className= "quiz-card"
        variants= {QuizCardVariants}
        initial= "hidden"
        animate= "visible"
        exit= "exit"
    >
        <motion.h2
            variants= {h2Variants}
        >{question}</motion.h2>
        <motion.ul variants= {QuizCardVariants}>
            { options.map((val, i) => <motion.div
                key= {i}
                variants= {OptionVariants}
                whileHover= { {scale: 1.1} }
                whileTap= { {scale: 0.9, transition: {type: "spring", stiffness: 90, damping: 25}} }
            >
                <QuizCardOption option= {{i, val}} isCorrect= {answerIndex === i}/>
            </motion.div>) }
        </motion.ul>
        <motion.button 
            exit= { { opacity: 0, y: 200 } }
            style= { {opacity: guess? 1 : 0} } 
            onClick= { () => setCurrentQuestion((cur) => cur+1) }>
        Next
        </motion.button> 
    </motion.div>
}

function QuizCardOption({option, isCorrect= false}){
    const { guess, setGuess, score } = useContext(PlayerContext);
    const [ scope, animate ] = useAnimate();

    const handleGuess = async () => {
        if (isCorrect){
            await animate(scope.current, { backgroundColor: "#3A5340", color: "#DAD7CD" },
                { ease: "easeInOut" }
            );
            if(guess === (option.i+1)) score.current+=10;
        }
        else if(guess === (option.i+1)){
            animate(scope.current, { backgroundColor: "#c30010", color: "#DAD7CD" },
                { ease: "easeInOut" }
            );
        }
    };

    useEffect(() => {
        setGuess(null);
    }, []);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if(guess) {
                console.log("guess", guess);
                handleGuess();
            }
        }, 100);

        return () => clearTimeout(timeOut);
    }, [guess]);

    return <div className= "quiz-card-option"
        onClick= { () => setGuess(option.i+1) }
        ref= {scope}
    >{option.val}</div>
}