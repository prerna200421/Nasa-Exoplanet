import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../providers/PlayerContextProvider";
import { IconContext } from "react-icons"
import { IoArrowBack } from "react-icons/io5";

export default function QuizLevelsCard(){
    const { level, setLevel } = useContext(PlayerContext);
    // const [ selected, setSelected ] = useState(null);
    const navigate = useNavigate();
    const levels = ["elementary", "middle school", "high school"];

    useEffect(() => {
        console.log("level", level);
    }, [level]);

    return <div className= "levels-container">
        <IconContext.Provider value= { {className: "arrow-back", size: "50px", color: "rgb(76, 74, 74)", paddingLeft: "20px"} }>
            <IoArrowBack onClick= { () => navigate(-1) }/>
        </IconContext.Provider>
        <h2>Select the level of difficulty</h2>
        { levels.map((val, i) => 
            <div className= { val === level ? "selected-level" : "level-option" }
                key= {i}
                onClick= { () => {
                    setLevel(val);
                 } }
            >
                {val}
            </div>)
        }
    </div>
}