import { useNavigate } from "react-router-dom";

export default function StartQuizButton({content, link}){
    const navigate = useNavigate();
    return <button onClick= { () => navigate(link) } className= "start-quiz-btn" >{content}</button>
}