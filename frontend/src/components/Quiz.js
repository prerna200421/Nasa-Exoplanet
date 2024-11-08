import QuizCard from "./QuizCard";
import { useNavigate } from "react-router-dom";
import QuizLoader from "./QuizLoader";
import { PlayerContext } from "../providers/PlayerContextProvider";
import { useState, useContext, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "../pages/styles/Quiz.css";
import QuizScoreCard from "./QuizScoreCard";
import { AnimatePresence, motion } from "framer-motion";


export default function Quiz(){
    const [ questions, setQuestions ] = useState([]);
    const [ currentQuestion, setCurrentQuestion ] = useState(null);
    const { level, guess, score } = useContext(PlayerContext);
    const { isLoading, error, fetchData } = useFetch();
    const navigate = useNavigate();

    const controller = useRef();

    const getQuestions = async (endpoint, options) => {
        const result = await fetchData(endpoint, controller.current.signal, options);
        console.log("result", result);
        if(result) {
            setQuestions(result.questions);
            setCurrentQuestion(0);
        }
    };

    console.log("level", level, isLoading);

    useEffect(() => {
        if (!level) {
            return navigate("/quiz/levels");
        }

        console.log("run");
        score.current = 0;
        controller.current = new AbortController();
        getQuestions(`/questions/${level}`);

        return () => controller.current.abort("unmounted component");
    }, []);

    return <div className= "quiz-wrapper">
        <AnimatePresence mode= "wait">
            { isLoading && <motion.div
                exit= { {opacity: 0, transition: {ease: "easeInOut", delay: 0.1}} }
            >
                <QuizLoader/>
            </motion.div> }
            { error && <h1>{error.error}</h1> }
            { (questions.length && currentQuestion < questions.length)? <QuizCard
                key= {currentQuestion} 
                setCurrentQuestion= {setCurrentQuestion}
                question= {questions[currentQuestion].question}
                options= {questions[currentQuestion].options}
                answerIndex= {questions[currentQuestion].answerIndex} 
            /> :
            questions.length && <QuizScoreCard/> }
        </AnimatePresence>
    </div>
     
}